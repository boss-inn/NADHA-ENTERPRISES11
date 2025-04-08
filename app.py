from flask import Flask, render_template, request, jsonify, make_response, send_from_directory
import pandas as pd
from datetime import datetime
import os
import uuid
import json
from werkzeug.utils import secure_filename
import traceback
import shutil
from openpyxl import load_workbook

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit

# Get the absolute path of the directory containing this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configuration using absolute paths
ORDERS_DIR = os.path.join(BASE_DIR, 'orders')
EXCEL_FILE = os.path.join(ORDERS_DIR, 'orders.xlsx')
BACKUP_DIR = os.path.join(ORDERS_DIR, 'backups')
ARCHIVE_DIR = os.path.join(ORDERS_DIR, 'archived')
DAILY_BACKUPS = 7  # Keep last 7 days of backups

def ensure_directory_exists(path):
    """Ensure directory exists, create if it doesn't with proper permissions"""
    try:
        os.makedirs(path, exist_ok=True)
        # Set permissions (read/write for owner, read for others)
        os.chmod(path, 0o755)
        app.logger.info(f"Directory ensured: {path}")
    except Exception as e:
        app.logger.error(f"Failed to create directory {path}: {str(e)}")
        raise RuntimeError(f"Cannot create directory {path}: {str(e)}")

def check_excel_structure():
    """Verify the Excel file has the correct structure"""
    if not os.path.exists(EXCEL_FILE):
        return False
        
    try:
        df = pd.read_excel(EXCEL_FILE, engine='openpyxl')
        required_columns = [
            'Order ID', 'Date', 'Customer Name', 'Customer Phone', 'Customer Address',
            'Product Name', 'Quantity', 'Price', 'Subtotal'
        ]
        return all(col in df.columns for col in required_columns)
    except:
        return False

def initialize_excel_file():
    """Initialize the Excel file with proper structure and permissions"""
    columns = [
        'Order ID', 'Date', 'Customer Name', 'Customer Phone', 'Customer Address',
        'Product Name', 'Quantity', 'Price', 'Subtotal', 'Size', 'Type', 'HP', 
        'Material', 'Bolt', 'Shape', 'mfd', 'Color', 'Amps', 'Thread', 'Length',
        'Gauge', 'Payment Status', 'Delivery Status', 'Notes'
    ]
    
    try:
        # Create a new DataFrame with the specified columns
        df = pd.DataFrame(columns=columns)
        
        # Ensure directory exists
        ensure_directory_exists(ORDERS_DIR)
        
        # Write to Excel with openpyxl engine (more reliable)
        with pd.ExcelWriter(EXCEL_FILE, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Orders', index=False)
        
        # Set file permissions
        os.chmod(EXCEL_FILE, 0o644)
        
        app.logger.info(f"Successfully created new Excel file at {EXCEL_FILE}")
        return True
    except Exception as e:
        app.logger.error(f"Failed to initialize Excel file: {str(e)}")
        raise RuntimeError(f"Cannot initialize Excel file: {str(e)}")

def initialize_system():
    """Initialize all required directories and files"""
    try:
        # Log the paths being used
        app.logger.info(f"Initializing system with these paths:")
        app.logger.info(f"Base directory: {BASE_DIR}")
        app.logger.info(f"Orders directory: {ORDERS_DIR}")
        app.logger.info(f"Excel file: {EXCEL_FILE}")
        app.logger.info(f"Backup directory: {BACKUP_DIR}")
        app.logger.info(f"Archive directory: {ARCHIVE_DIR}")
        
        # Create directories if they don't exist
        ensure_directory_exists(ORDERS_DIR)
        ensure_directory_exists(BACKUP_DIR)
        ensure_directory_exists(ARCHIVE_DIR)
        
        # Check if Excel file exists and is valid
        if not os.path.exists(EXCEL_FILE) or not check_excel_structure():
            if not initialize_excel_file():
                raise RuntimeError("Failed to initialize Excel file")
        else:
            # Verify file is writable
            try:
                with open(EXCEL_FILE, 'a'):
                    pass
                app.logger.info(f"Excel file is writable: {EXCEL_FILE}")
            except IOError as e:
                app.logger.error(f"Excel file not writable: {str(e)}")
                raise RuntimeError(f"Cannot write to Excel file: {str(e)}")
            
        cleanup_old_backups()
        app.logger.info("System initialization completed successfully")
    except Exception as e:
        app.logger.error(f"Initialization error: {str(e)}\n{traceback.format_exc()}")
        raise

def cleanup_old_backups():
    """Remove old backup files keeping only the last 7 days"""
    try:
        if not os.path.exists(BACKUP_DIR):
            return
            
        backups = [f for f in os.listdir(BACKUP_DIR) if f.endswith('.xlsx')]
        backups = sorted(backups)
        
        if len(backups) > DAILY_BACKUPS:
            for old_backup in backups[:-DAILY_BACKUPS]:
                try:
                    os.remove(os.path.join(BACKUP_DIR, old_backup))
                    app.logger.info(f"Removed old backup: {old_backup}")
                except Exception as e:
                    app.logger.error(f"Failed to remove backup {old_backup}: {str(e)}")
    except Exception as e:
        app.logger.error(f"Backup cleanup error: {str(e)}\n{traceback.format_exc()}")

def create_backup():
    """Create a timestamped backup of the Excel file"""
    try:
        if not os.path.exists(EXCEL_FILE):
            app.logger.warning("No Excel file to backup - skipping")
            return False
            
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = os.path.join(BACKUP_DIR, f'orders_backup_{timestamp}.xlsx')
        
        ensure_directory_exists(BACKUP_DIR)
        shutil.copy2(EXCEL_FILE, backup_file)
        
        # Set backup file permissions
        os.chmod(backup_file, 0o644)
        
        app.logger.info(f"Created backup at {backup_file}")
        return True
    except Exception as e:
        app.logger.error(f"Backup creation error: {str(e)}\n{traceback.format_exc()}")
        return False

def validate_order_data(data):
    """Validate incoming order data with detailed checks"""
    try:
        if not isinstance(data, dict):
            return False, "Request data must be a JSON object"
            
        required_fields = ['customer', 'products']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return False, f"Missing required fields: {', '.join(missing_fields)}"
        
        customer_fields = ['name', 'phone', 'address']
        missing_customer_fields = [
            field for field in customer_fields 
            if field not in data['customer'] or not data['customer'][field]
        ]
        if missing_customer_fields:
            return False, f"Missing customer information: {', '.join(missing_customer_fields)}"
        
        if not isinstance(data['products'], list):
            return False, "Products must be an array"
            
        if len(data['products']) == 0:
            return False, "Order must contain at least one product"
        
        for idx, product in enumerate(data['products'], 1):
            if not isinstance(product, dict):
                return False, f"Product {idx} must be an object"
                
            if 'name' not in product or not product['name'].strip():
                return False, f"Product {idx} missing name"
                
            try:
                price = float(product.get('price', 0))
                if price <= 0:
                    return False, f"Product {idx} price must be positive"
            except (ValueError, TypeError):
                return False, f"Product {idx} has invalid price"
                
            try:
                quantity = int(product.get('quantity', 0))
                if quantity <= 0:
                    return False, f"Product {idx} quantity must be positive"
            except (ValueError, TypeError):
                return False, f"Product {idx} has invalid quantity"
        
        return True, ""
    except Exception as e:
        app.logger.error(f"Validation error: {str(e)}\n{traceback.format_exc()}")
        return False, "Error validating order data"

def process_order_products(order_id, date, customer, products):
    """Process order products into DataFrame rows with error handling"""
    order_rows = []
    for product in products:
        try:
            quantity = int(product.get('quantity', 1))
            price = float(product.get('price', 0))
            subtotal = quantity * price
            
            row = {
                'Order ID': order_id,
                'Date': date,
                'Customer Name': customer.get('name', '').strip(),
                'Customer Phone': customer.get('phone', '').strip(),
                'Customer Address': customer.get('address', '').strip(),
                'Product Name': product.get('name', 'Unknown Product').strip(),
                'Quantity': quantity,
                'Price': price,
                'Subtotal': subtotal,
                'Size': product.get('size', '').strip(),
                'Type': product.get('type', '').strip(),
                'HP': product.get('hp', '').strip(),
                'Material': product.get('material', '').strip(),
                'Bolt': product.get('bolt', '').strip(),
                'Shape': product.get('shape', '').strip(),
                'mfd': product.get('mfd', '').strip(),
                'Color': product.get('color', '').strip(),
                'Amps': product.get('amps', '').strip(),
                'Thread': product.get('thread', '').strip(),
                'Length': product.get('length', '').strip(),
                'Gauge': product.get('gauge', '').strip(),
                'Payment Status': 'Pending',
                'Delivery Status': 'Processing',
                'Notes': ''
            }
            order_rows.append(row)
        except Exception as e:
            app.logger.error(f"Error processing product {product.get('name')}: {str(e)}\n{traceback.format_exc()}")
            continue
    
    return order_rows

def save_to_excel(order_rows):
    """Save order data to Excel file with transaction-like behavior"""
    backup_success = False
    try:
        # Create backup first
        backup_success = create_backup()
        
        # Read existing data or create new DataFrame
        if os.path.exists(EXCEL_FILE):
            try:
                # Try reading with openpyxl first
                df = pd.read_excel(EXCEL_FILE, engine='openpyxl')
            except Exception as e:
                app.logger.error(f"Failed to read Excel file: {str(e)}")
                # If reading fails, initialize a new file
                if not initialize_excel_file():
                    return False
                df = pd.DataFrame()
        else:
            if not initialize_excel_file():
                return False
            df = pd.DataFrame()
        
        # Append new orders
        new_df = pd.DataFrame(order_rows)
        updated_df = pd.concat([df, new_df], ignore_index=True)
        
        # Save to Excel with explicit engine
        with pd.ExcelWriter(EXCEL_FILE, engine='openpyxl') as writer:
            updated_df.to_excel(writer, sheet_name='Orders', index=False)
        
        # Set file permissions
        os.chmod(EXCEL_FILE, 0o644)
        
        app.logger.info(f"Successfully saved {len(order_rows)} products to Excel")
        return True
    except PermissionError as e:
        app.logger.error(f"Permission denied when saving Excel: {str(e)}")
        return False
    except Exception as e:
        app.logger.error(f"Excel save error: {str(e)}\n{traceback.format_exc()}")
        if backup_success:
            try:
                backups = [f for f in os.listdir(BACKUP_DIR) if f.endswith('.xlsx')]
                backups = sorted(backups)
                if backups:
                    latest_backup = os.path.join(BACKUP_DIR, backups[-1])
                    shutil.copy2(latest_backup, EXCEL_FILE)
                    app.logger.info("Restored from backup after failed save")
            except Exception as restore_error:
                app.logger.error(f"Failed to restore from backup: {str(restore_error)}")
        return False

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/api/test-excel', methods=['GET'])
def test_excel():
    """Test endpoint to verify Excel file accessibility"""
    try:
        if os.path.exists(EXCEL_FILE):
            return jsonify({
                'exists': True,
                'path': EXCEL_FILE,
                'absolute_path': os.path.abspath(EXCEL_FILE),
                'writable': os.access(EXCEL_FILE, os.W_OK),
                'size': os.path.getsize(EXCEL_FILE)
            })
        return jsonify({'exists': False})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def save_order():
    """Handle order submission with comprehensive error handling"""
    try:
        app.logger.info(f"Incoming request: {request.data[:1000]}...")
        
        if not request.is_json:
            app.logger.error("Request is not JSON")
            return jsonify({
                'success': False,
                'message': 'Request must be JSON',
                'error_code': 'INVALID_FORMAT'
            }), 400

        try:
            data = request.get_json()
        except Exception as e:
            app.logger.error(f"JSON parse error: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Invalid JSON format',
                'error_code': 'INVALID_JSON'
            }), 400

        is_valid, message = validate_order_data(data)
        if not is_valid:
            app.logger.error(f"Validation failed: {message}")
            return jsonify({
                'success': False,
                'message': message,
                'error_code': 'VALIDATION_ERROR'
            }), 400

        order_id = f"ORD-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:4].upper()}"
        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        order_rows = process_order_products(
            order_id, 
            current_date, 
            data['customer'], 
            data['products']
        )
        
        if not order_rows:
            app.logger.error("No valid products after processing")
            return jsonify({
                'success': False,
                'message': 'No valid products could be processed',
                'error_code': 'NO_VALID_PRODUCTS'
            }), 400
        
        total = sum(row['Subtotal'] for row in order_rows)
        
        if not save_to_excel(order_rows):
            app.logger.error("Failed to save to Excel")
            return jsonify({
                'success': False,
                'message': 'Failed to save order to database',
                'error_code': 'DATABASE_SAVE_ERROR'
            }), 500
            
        app.logger.info(f"Successfully processed order {order_id}")
        return jsonify({
            'success': True,
            'message': 'Order saved successfully',
            'order_id': order_id,
            'order_date': current_date,
            'total_amount': total,
            'product_count': len(order_rows)
        })
    
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}\n{traceback.format_exc()}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred',
            'error_code': 'INTERNAL_ERROR',
            'system_error': str(e)
        }), 500

if __name__ == '__main__':
    try:
        print(f"Starting application with base directory: {BASE_DIR}")
        print(f"Orders will be saved to: {EXCEL_FILE}")
        initialize_system()
        app.logger.info("System initialized successfully")
        app.run(host='0.0.0.0', port=5000, debug=True)
    except Exception as e:
        app.logger.error(f"Failed to start application: {str(e)}\n{traceback.format_exc()}")
        raise