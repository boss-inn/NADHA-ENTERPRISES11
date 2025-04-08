document.addEventListener("DOMContentLoaded", function () {
    const productList = [
        { name: "FINOLEX FLAT CABLES", price: 250, image: "/static/images/fino-flex-flat-cables.png" },
        { name: "DIGITAL PANEL BOARD", price: 2500, image: "/static/images/digital-panel-board.png" },
        { name: "PANEL BOARD", price: 1200, image: "/static/images/panel-board.png" },
        { name: "GIRNAR ROPE", price: 150, image: "/static/images/girnar-rope.png" },
        { name: "OPEN WELL PANEL BOARD", price: 1800, image: "/static/images/open-well-panel-board.png" },
        { name: "COMPRESSOR CLAMP", price: 500, image: "/static/images/compressor-clamp.png" },
        { name: "CLAMP", price: 300, image: "/static/images/clamp.png" },
        { name: "CI ADAPTOR", price: 200, image: "/static/images/ci-adaptor.png" },
        { name: "SS ADAPTER", price: 350, image: "/static/images/ss-adapter.png" },
        { name: "NRV CASTING", price: 400, image: "/static/images/nrv-casting.png" },
        { name: "NRV BRASS", price: 450, image: "/static/images/nrv-brass.png" },
        { name: "BARE NIPPLE", price: 100, image: "/static/images/bare-nipple.png" },
        { name: "BALL VALVE", price: 600, image: "/static/images/ball-valve.png" },
        { name: "HEX NIPPLE", price: 150, image: "/static/images/hex-nipple.png" },
        { name: "STARTER MOTOR", price: 2000, image: "/static/images/starter-motor.png" },
        { name: "HORSE COLLAR WITH HOOK", price: 400, image: "/static/images/horse-collar-with-hook.png" },
        { name: "HORSE COLLAR WITHOUT HOOK", price: 350, image: "/static/images/horse-collar-without-hook.png" },
        { name: "HD CONNECTOR", price: 550, image: "/static/images/hd-connector.png" },
        { name: "BENT COLLAR", price: 380, image: "/static/images/bent-collar.png" },
        { name: "CI HORSE COLLAR", price: 420, image: "/static/images/ci-horse-collar.png" },
        { name: "ORANGE CI HORSE COLLAR", price: 440, image: "/static/images/orange-ci-horse-collar.png" },
        { name: "SPECIAL HORSE COLLAR", price: 480, image: "/static/images/special-horse-collar.png" },
        { name: "U CLAMP", price: 320, image: "/static/images/u-clamp.png" },
        { name: "HORSE CLIP", price: 280, image: "/static/images/horse-clip.png" },
        { name: "BORE COVER", price: 380, image: "/static/images/bore-cover.png" },
        { name: "FLUID LEVEL CONTROLLER", price: 1200, image: "/static/images/fluid-level-controller.png" },
        { name: "GI BENT", price: 220, image: "/static/images/gi-bent.png" },
        { name: "GI COUPLING", price: 180, image: "/static/images/gi-coupling.png" },
        { name: "GI REDUCER", price: 200, image: "/static/images/gi-reducer.png" },
        { name: "GI LBOW", price: 240, image: "/static/images/gi-lbow.png" },
        { name: "GI T", price: 260, image: "/static/images/gi-t.png" },
        { name: "KANGAROO SHELLAC", price: 300, image: "/static/images/kangaroo-shellac.png" },
        { name: "COOPER", price: 150, image: "/static/images/cooper.png" },
        { name: "BUSH", price: 120, image: "/static/images/bush.png" },
        { name: "CABLE TIE", price: 50, image: "/static/images/cable-tie.png" },
        { name: "BENT", price: 180, image: "/static/images/bent.png" },
        { name: "PVC BALL VALVE", price: 350, image: "/static/images/pvc-ball-valve.png" },
        { name: "MOTOR FAN", price: 400, image: "/static/images/motor-fan.png" },
        { name: "FLANGE", price: 280, image: "/static/images/flange.png" },
        { name: "E FAB INSULATION TAPE", price: 100, image: "/static/images/e-fab-insulation-tape.png" },
        { name: "WASHER", price: 80, image: "/static/images/washer.png" },
        { name: "KVR CAPACITOR", price: 300, image: "/static/images/kvr-capacitor.png" },
        { name: "KELTRON CAPACITOR", price: 350, image: "/static/images/keltron-capacitor.png" },
        { name: "STARTING AND RUNNING CAPACITORS", price: 400, image: "/static/images/starting-running-capacitors.png" },
        { name: "RUBBER COMPOUND", price: 150, image: "/static/images/rubber-compound.png" },
        { name: "TANK LID", price: 200, image: "/static/images/tank-lid.png" },
        { name: "ORINGS", price: 50, image: "/static/images/orings.png" },
        { name: "PANEL BOARD SWITCHES", price: 120, image: "/static/images/panel-board-switches.png" },
        { name: "PANEL BOARD ANALOG METERS", price: 300, image: "/static/images/panel-board-analog-meters.png" },
        { name: "MCB", price: 200, image: "/static/images/mcb.png" },
        { name: "MOTOR COVER", price: 180, image: "/static/images/motor-cover.png" },
        { name: "FAN COVER", price: 120, image: "/static/images/fan-cover.png" },
        { name: "LEATHER FLANGE WASHER", price: 90, image: "/static/images/leather-flange-washer.png" },
        { name: "SS TAP POST", price: 220, image: "/static/images/ss-tap-post.png" },
        { name: "PIPE OF AUTOMATIC WASHING MACHINE", price: 180, image: "/static/images/pipe-automatic-washing-machine.png" },
        { name: "UNION", price: 150, image: "/static/images/union.png" },
        { name: "JOINTER", price: 100, image: "/static/images/jointer.png" },
        { name: "TAP", price: 250, image: "/static/images/tap.png" },
        { name: "MONO BLOCK PUMP", price: 3500, image: "/static/images/mono-block-pump.png" },
        { name: "OPENWELL PUMP", price: 4000, image: "/static/images/openwell-pump.png" },
        { name: "BOREWELL PUMP", price: 5000, image: "/static/images/borewell-pump.png" }
    ];

    const productListContainer = document.getElementById("product-list");
    const cartList = document.getElementById("cart-list");
    const checkoutBtn = document.getElementById("checkout-btn");
    const customerNameInput = document.getElementById("customer-name");
    const customerPhoneInput = document.getElementById("customer-phone");
    const customerAddressInput = document.getElementById("customer-address");
    let cart = [];

    function renderProducts() {
        productListContainer.innerHTML = "";
        productList.forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product", "water-flow-theme");

            let optionsHTML = `
                <label for="quantity-${index}">Quantity:</label>
                <input type="number" id="quantity-${index}" min="1" value="1" class="product-input">
            `;

            // Add specific options based on product type
            switch(product.name) {
                case "FINOLEX FLAT CABLES":
                    optionsHTML += `
                        <label for="gauge-${index}">Gauge:</label>
                        <select id="gauge-${index}" class="product-select">
                            <option value="1.5 sq.mm">1.5 sq.mm</option>
                            <option value="2 sq.mm">2 sq.mm</option>
                            <option value="4 sq.mm">4 sq.mm</option>
                        </select>
                        <label for="length-${index}">Length (MTR):</label>
                        <input type="number" id="length-${index}" min="1" class="product-input">
                    `;
                    break;
                
                case "GIRNAR ROPE":
                    optionsHTML += `
                        <label for="gauge-${index}">Gauge:</label>
                        <select id="gauge-${index}" class="product-select">
                            <option value="10 mm">10 mm</option>
                            <option value="12 mm">12 mm</option>
                            <option value="14 mm">14 mm</option>
                        </select>
                        <label for="length-${index}">Length (MTR):</label>
                        <input type="number" id="length-${index}" min="1" class="product-input">
                    `;
                    break;
                
                case "PANEL BOARD":
                case "DIGITAL PANEL BOARD":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="MCB">MCB</option>
                            <option value="Contact">Contact</option>
                        </select>
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="1HP">1HP</option>
                            <option value="1.5HP">1.5HP</option>
                            <option value="2HP">2HP</option>
                            <option value="3HP">3HP</option>
                        </select>
                    `;
                    break;
                
                case "OPEN WELL PANEL BOARD":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="1HP">1HP</option>
                            <option value="1.5HP">1.5HP</option>
                            <option value="2HP">2HP</option>
                            <option value="3HP">3HP</option>
                        </select>
                    `;
                    break;
                
                case "COMPRESSOR CLAMP":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="1×½\"">1×½"</option>
                            <option value="1¼×½\"">1¼×½"</option>
                        </select>
                    `;
                    break;
                
                case "CLAMP":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="bolt-${index}">Bolt Type:</label>
                        <select id="bolt-${index}" class="product-select">
                            <option value="Single Bolt">Single Bolt</option>
                            <option value="Double Bolt">Double Bolt</option>
                        </select>
                    `;
                    break;
                
                case "CI ADAPTOR":
                case "SS ADAPTER":
                case "GI LBOW":
                case "GI T":
                case "BUSH":
                case "CABLE TIE":
                case "NRV CASTING":
                case "NRV BRASS":
                case "BALL VALVE":
                case "PVC BALL VALVE":
                case "HEX NIPPLE":
                case "BENT COLLAR":
                case "CI HORSE COLLAR":
                case "ORANGE CI HORSE COLLAR":
                case "SPECIAL HORSE COLLAR":
                case "GI BENT":
                case "GI COUPLING":
                case "GI REDUCER":
                case "COOPER":
                case "LEATHER FLANGE WASHER":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                    `;
                    break;
                
                case "BARE NIPPLE":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="½×2\"">½×2"</option>
                            <option value="½×3\"">½×3"</option>
                            <option value="½×4\"">½×4"</option>
                            <option value="½×6\"">½×6"</option>
                            <option value="½×9\"">½×9"</option>
                            <option value="¾×2\"">¾×2"</option>
                            <option value="¾×3\"">¾×3"</option>
                            <option value="¾×4\"">¾×4"</option>
                            <option value="¾×6\"">¾×6"</option>
                            <option value="¾×9\"">¾×9"</option>
                            <option value="1×2\"">1×2"</option>
                            <option value="1×3\"">1×3"</option>
                            <option value="1×4\"">1×4"</option>
                            <option value="1×6\"">1×6"</option>
                            <option value="1×9\"">1×9"</option>
                            <option value="1¼×2\"">1¼×2"</option>
                            <option value="1¼×3\"">1¼×3"</option>
                            <option value="1¼×4\"">1¼×4"</option>
                            <option value="1¼×6\"">1¼×6"</option>
                            <option value="1¼×9\"">1¼×9"</option>
                        </select>
                    `;
                    break;
                
                case "STARTER MOTOR":
                case "MOTOR FAN":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="½HP">½HP</option>
                            <option value="1HP">1HP</option>
                        </select>
                    `;
                    break;
                
                case "HORSE COLLAR WITH HOOK":
                case "HORSE COLLAR WITHOUT HOOK":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼×1\"">1¼×1"</option>
                            <option value="1½×1\"">1½×1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2×1\"">2×1"</option>
                            <option value="1½×2\"">1½×2"</option>
                            <option value="2×1½\"">2×1½"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="MS">MS</option>
                            <option value="SS">SS</option>
                        </select>
                    `;
                    break;
                
                case "HD CONNECTOR":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="MS">MS</option>
                            <option value="SS">SS</option>
                        </select>
                    `;
                    break;
                
                case "U CLAMP":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="MS">MS</option>
                            <option value="SS">SS</option>
                        </select>
                    `;
                    break;
                
                case "HORSE CLIP":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="Jublee">Jublee</option>
                            <option value="MS">MS</option>
                            <option value="SS">SS</option>
                        </select>
                    `;
                    break;
                
                case "BORE COVER":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="5×1\"">5×1"</option>
                            <option value="5×1¼\"">5×1¼"</option>
                            <option value="5×1½\"">5×1½"</option>
                            <option value="5×2\"">5×2"</option>
                            <option value="7×1\"">7×1"</option>
                            <option value="7×1¼\"">7×1¼"</option>
                            <option value="7×1½\"">7×1½"</option>
                            <option value="7×2\"">7×2"</option>
                        </select>
                    `;
                    break;
                
                case "BENT":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="PVC">PVC</option>
                            <option value="NILON">NILON</option>
                        </select>
                    `;
                    break;
                
                case "FLANGE":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="shape-${index}">Shape:</label>
                        <select id="shape-${index}" class="product-select">
                            <option value="Oval">Oval</option>
                            <option value="Round">Round</option>
                            <option value="Square">Square</option>
                        </select>
                    `;
                    break;
                
                case "E FAB INSULATION TAPE":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="Min">Min</option>
                            <option value="Supreme">Supreme</option>
                        </select>
                    `;
                    break;
                
                case "WASHER":
                    optionsHTML += `
                        <label for="shape-${index}">Shape:</label>
                        <select id="shape-${index}" class="product-select">
                            <option value="Oval">Oval</option>
                            <option value="Round">Round</option>
                            <option value="Square">Square</option>
                        </select>
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="½">½</option>
                            <option value="1">1</option>
                        </select>
                    `;
                    break;
                
                case "KVR CAPACITOR":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="1 KVR">1 KVR</option>
                            <option value="2 KVR">2 KVR</option>
                            <option value="3 KVR">3 KVR</option>
                        </select>
                    `;
                    break;
                
                case "KELTRON CAPACITOR":
                    optionsHTML += `
                        <label for="mfd-${index}">mfd:</label>
                        <input type="text" id="mfd-${index}" value="2 mfd" readonly class="product-input">
                    `;
                    break;
                
                case "STARTING AND RUNNING CAPACITORS":
                    optionsHTML += `
                        <label for="mfd-${index}">mfd:</label>
                        <select id="mfd-${index}" class="product-select">
                            <option value="2 mfd">2 mfd</option>
                            <option value="4 mfd">4 mfd</option>
                            <option value="6 mfd">6 mfd</option>
                            <option value="8 mfd">8 mfd</option>
                            <option value="10 mfd">10 mfd</option>
                            <option value="12.5 mfd">12.5 mfd</option>
                            <option value="15 mfd">15 mfd</option>
                            <option value="20 mfd">20 mfd</option>
                            <option value="25 mfd">25 mfd</option>
                            <option value="35 mfd">35 mfd</option>
                            <option value="40 mfd">40 mfd</option>
                            <option value="50 mfd">50 mfd</option>
                            <option value="60 mfd">60 mfd</option>
                            <option value="75 mfd">75 mfd</option>
                        </select>
                    `;
                    break;
                
                case "PANEL BOARD SWITCHES":
                    optionsHTML += `
                        <label for="color-${index}">Color:</label>
                        <select id="color-${index}" class="product-select">
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                        </select>
                    `;
                    break;
                
                case "PANEL BOARD ANALOG METERS":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="Ampere Meter">Ampere Meter</option>
                            <option value="Volt Meter">Volt Meter</option>
                        </select>
                    `;
                    break;
                
                case "MCB":
                    optionsHTML += `
                        <label for="amps-${index}">Amps:</label>
                        <select id="amps-${index}" class="product-select">
                            <option value="10 amps">10 amps</option>
                            <option value="16 amps">16 amps</option>
                            <option value="20 amps">20 amps</option>
                        </select>
                    `;
                    break;
                
                case "MOTOR COVER":
                case "FAN COVER":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="½ HP">½ HP</option>
                            <option value="1 HP">1 HP</option>
                            <option value="1½ HP">1½ HP</option>
                        </select>
                    `;
                    break;
                
                case "SS TAP POST":
                    optionsHTML += `
                        <label for="thread-${index}">Thread Type:</label>
                        <select id="thread-${index}" class="product-select">
                            <option value="Inner thread">Inner thread</option>
                            <option value="Outer thread">Outer thread</option>
                        </select>
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="½">½</option>
                            <option value="¾">¾</option>
                        </select>
                    `;
                    break;
                
                case "PIPE OF AUTOMATIC WASHING MACHINE":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="Inlet">Inlet</option>
                            <option value="Outlet">Outlet</option>
                        </select>
                        <label for="length-${index}">Length (Meter):</label>
                        <input type="number" id="length-${index}" min="1" class="product-input">
                    `;
                    break;
                
                case "UNION":
                    optionsHTML += `
                        <label for="size-${index}">Size:</label>
                        <select id="size-${index}" class="product-select">
                            <option value="1\"">1"</option>
                            <option value="1¼\"">1¼"</option>
                            <option value="1½\"">1½"</option>
                            <option value="2\"">2"</option>
                            <option value="2¼\"">2¼"</option>
                            <option value="2½\"">2½"</option>
                            <option value="3\"">3"</option>
                        </select>
                        <label for="material-${index}">Material:</label>
                        <select id="material-${index}" class="product-select">
                            <option value="PVC">PVC</option>
                            <option value="GI">GI</option>
                        </select>
                    `;
                    break;
                
                case "TAP":
                    optionsHTML += `
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="Long body">Long body</option>
                            <option value="Short body">Short body</option>
                            <option value="Grip body">Grip body</option>
                        </select>
                    `;
                    break;
                
                case "MONO BLOCK PUMP":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="½ HP">½ HP</option>
                            <option value="1 HP">1 HP</option>
                            <option value="1.5 HP">1.5 HP</option>
                        </select>
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="1×1">1×1</option>
                            <option value="1×1/1¼×1">1×1/1¼×1</option>
                            <option value="2×1½">2×1½</option>
                        </select>
                    `;
                    break;
                
                case "OPENWELL PUMP":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="1 HP">1 HP</option>
                        </select>
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="1×1">1×1</option>
                            <option value="1¼×1">1¼×1</option>
                            <option value="1¼×1½">1¼×1½</option>
                        </select>
                    `;
                    break;
                
                case "BOREWELL PUMP":
                    optionsHTML += `
                        <label for="hp-${index}">HP:</label>
                        <select id="hp-${index}" class="product-select">
                            <option value="1 HP">1 HP</option>
                            <option value="1.5 HP">1.5 HP</option>
                            <option value="2 HP">2 HP</option>
                        </select>
                        <label for="type-${index}">Type:</label>
                        <select id="type-${index}" class="product-select">
                            <option value="12 stage">12 stage</option>
                            <option value="15 stage">15 stage</option>
                            <option value="18 stage">18 stage</option>
                            <option value="20 stage">20 stage</option>
                            <option value="22 stage">22 stage</option>
                            <option value="25 stage">25 stage</option>
                            <option value="28 stage">28 stage</option>
                            <option value="30 stage">30 stage</option>
                        </select>
                    `;
                    break;
            }

            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                ${optionsHTML}
                <button class="add-to-cart-btn" onclick="addToCart(${index})">Add to Cart</button>
            `;

            productListContainer.appendChild(productItem);
        });
    }

    window.addToCart = function (index) {
        const selectedProduct = { ...productList[index] };
        const quantityInput = document.getElementById(`quantity-${index}`);
        
        // Validate quantity
        if (!quantityInput.value || parseInt(quantityInput.value) < 1) {
            alert("Please enter a valid quantity (minimum 1)");
            quantityInput.focus();
            return;
        }
        
        selectedProduct.quantity = parseInt(quantityInput.value) || 1;

        // Get all possible product attributes based on product type
        switch(selectedProduct.name) {
            case "FINOLEX FLAT CABLES":
                selectedProduct.gauge = document.getElementById(`gauge-${index}`).value;
                const length = document.getElementById(`length-${index}`).value;
                if (!length || parseInt(length) < 1) {
                    alert("Please enter a valid length for FINOLEX FLAT CABLES");
                    return;
                }
                selectedProduct.length = length;
                break;
                
            case "GIRNAR ROPE":
                selectedProduct.gauge = document.getElementById(`gauge-${index}`).value;
                const ropeLength = document.getElementById(`length-${index}`).value;
                if (!ropeLength || parseInt(ropeLength) < 1) {
                    alert("Please enter a valid length for GIRNAR ROPE");
                    return;
                }
                selectedProduct.length = ropeLength;
                break;
                
            case "PANEL BOARD":
            case "DIGITAL PANEL BOARD":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                selectedProduct.hp = document.getElementById(`hp-${index}`).value;
                break;
                
            case "OPEN WELL PANEL BOARD":
                selectedProduct.hp = document.getElementById(`hp-${index}`).value;
                break;
                
            case "COMPRESSOR CLAMP":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                break;
                
            case "CLAMP":
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                selectedProduct.bolt = document.getElementById(`bolt-${index}`).value;
                break;
                
            case "CI ADAPTOR":
            case "SS ADAPTER":
            case "GI LBOW":
            case "GI T":
            case "BUSH":
            case "CABLE TIE":
            case "NRV CASTING":
            case "NRV BRASS":
            case "BALL VALVE":
            case "PVC BALL VALVE":
            case "HEX NIPPLE":
            case "BENT COLLAR":
            case "CI HORSE COLLAR":
            case "ORANGE CI HORSE COLLAR":
            case "SPECIAL HORSE COLLAR":
            case "GI BENT":
            case "GI COUPLING":
            case "GI REDUCER":
            case "COOPER":
            case "LEATHER FLANGE WASHER":
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                break;
                
            case "BARE NIPPLE":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                break;
                
            case "STARTER MOTOR":
            case "MOTOR FAN":
            case "MOTOR COVER":
            case "FAN COVER":
            case "MONO BLOCK PUMP":
            case "OPENWELL PUMP":
            case "BOREWELL PUMP":
                selectedProduct.hp = document.getElementById(`hp-${index}`).value;
                break;
                
            case "HORSE COLLAR WITH HOOK":
            case "HORSE COLLAR WITHOUT HOOK":
            case "HD CONNECTOR":
            case "U CLAMP":
            case "HORSE CLIP":
            case "BENT":
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                selectedProduct.material = document.getElementById(`material-${index}`).value;
                break;
                
            case "FLANGE":
            case "WASHER":
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                selectedProduct.shape = document.getElementById(`shape-${index}`).value;
                break;
                
            case "E FAB INSULATION TAPE":
            case "KVR CAPACITOR":
            case "PANEL BOARD SWITCHES":
            case "PANEL BOARD ANALOG METERS":
            case "TAP":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                break;
                
            case "KELTRON CAPACITOR":
                selectedProduct.mfd = document.getElementById(`mfd-${index}`).value;
                break;
                
            case "STARTING AND RUNNING CAPACITORS":
                selectedProduct.mfd = document.getElementById(`mfd-${index}`).value;
                break;
                
            case "MCB":
                selectedProduct.amps = document.getElementById(`amps-${index}`).value;
                break;
                
            case "SS TAP POST":
                selectedProduct.thread = document.getElementById(`thread-${index}`).value;
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                break;
                
            case "PIPE OF AUTOMATIC WASHING MACHINE":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                const pipeLength = document.getElementById(`length-${index}`).value;
                if (!pipeLength || parseInt(pipeLength) < 1) {
                    alert("Please enter a valid length for PIPE OF AUTOMATIC WASHING MACHINE");
                    return;
                }
                selectedProduct.length = pipeLength;
                break;
                
            case "UNION":
                selectedProduct.size = document.getElementById(`size-${index}`).value;
                selectedProduct.material = document.getElementById(`material-${index}`).value;
                break;
                
            case "MONO BLOCK PUMP":
            case "OPENWELL PUMP":
            case "BOREWELL PUMP":
                selectedProduct.type = document.getElementById(`type-${index}`).value;
                break;
        }

        cart.push(selectedProduct);
        renderCart();
    };

    function renderCart() {
        cartList.innerHTML = "";
        let totalAmount = 0;
        
        cart.forEach((product, index) => {
            const cartItem = document.createElement("li");
            const subtotal = product.price * product.quantity;
            totalAmount += subtotal;
            
            let details = [];
            if (product.size) details.push(`Size: ${product.size}`);
            if (product.type) details.push(`Type: ${product.type}`);
            if (product.hp) details.push(`HP: ${product.hp}`);
            if (product.material) details.push(`Material: ${product.material}`);
            if (product.bolt) details.push(`Bolt: ${product.bolt}`);
            if (product.shape) details.push(`Shape: ${product.shape}`);
            if (product.mfd) details.push(`mfd: ${product.mfd}`);
            if (product.color) details.push(`Color: ${product.color}`);
            if (product.amps) details.push(`Amps: ${product.amps}`);
            if (product.thread) details.push(`Thread: ${product.thread}`);
            if (product.length) details.push(`Length: ${product.length}`);
            if (product.gauge) details.push(`Gauge: ${product.gauge}`);
            
            cartItem.innerHTML = `
                <div class="cart-item">
                    <span class="cart-item-name">${product.name}</span>
                    <span class="cart-item-price">₹${product.price} x ${product.quantity} = ₹${subtotal}</span>
                    ${details.length > 0 ? `<div class="cart-item-details">${details.join(', ')}</div>` : ''}
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        // Display total amount
        const totalItem = document.createElement("li");
        totalItem.className = "cart-total";
        totalItem.innerHTML = `<strong>Total Amount: ₹${totalAmount}</strong>`;
        cartList.appendChild(totalItem);
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        renderCart();
    };

    checkoutBtn.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add some products before checkout.");
            return;
        }

        const customerName = customerNameInput.value.trim();
        const customerPhone = customerPhoneInput.value.trim();
        const customerAddress = customerAddressInput.value.trim();

        if (!customerName || !customerPhone || !customerAddress) {
            alert("Please fill in all customer details (Name, Phone, and Address) before checkout.");
            return;
        }

        // Validate phone number
        if (!/^\d{10}$/.test(customerPhone)) {
            alert("Please enter a valid 10-digit phone number");
            customerPhoneInput.focus();
            return;
        }

        const orderData = {
            customer: {
                name: customerName,
                phone: customerPhone,
                address: customerAddress
            },
            products: cart.map(product => {
                // Create a clean product object with only relevant fields
                const cleanProduct = {
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                };
                
                // Add optional fields if they exist
                const optionalFields = ['size', 'type', 'hp', 'material', 'bolt', 'shape', 
                                       'mfd', 'color', 'amps', 'thread', 'length', 'gauge'];
                
                optionalFields.forEach(field => {
                    if (product[field]) {
                        cleanProduct[field] = product[field];
                    }
                });
                
                return cleanProduct;
            }),
            date: new Date().toISOString()
        };
        

        // Show loading state
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = "Processing...";

        // Send the order data to the server
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Failed to save order');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(`Order placed successfully! Order ID: ${data.order_id}`);
                cart = [];
                renderCart();
                customerNameInput.value = '';
                customerPhoneInput.value = '';
                customerAddressInput.value = '';
            } else {
                alert('Error: ' + (data.message || 'Failed to save order'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving order: ' + error.message);
        })
        .finally(() => {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Checkout";
        });
    });

    // Initialize the product list
    renderProducts();
});