export const KINDS = [
  { value: "forklift", label: "Forklift" },
  { value: "tool", label: "Tool" },
  { value: "reference", label: "Reference" },
  { value: "other", label: "Other" },
];

export const BRANDS = {
  "Toyota": [
    "8FGCU25", "8FGCU30", "8FBE15", "8FBE20", "7FGCU25",
    "7FGCU30", "6FGCU25", "5FGCU25", "8HBW23", "8HBC30",
  ],
  "Yale / Hyster": [
    "GLP060VX", "GLP050VX", "ERP040VT", "S50FT", "S60FT",
    "H50FT", "H60FT", "E50XN", "MPB045VG", "PC4500",
  ],
  "Mitsubishi / Unicarrier": [
    "FGC25N", "FGC30N", "FB16PN", "FB20PN", "FD25N",
    "FD30N", "PF50", "1F4A25U", "MPC60", "QX2-25",
  ],
  "Heli": [
    "CPCD25", "CPCD30", "CPCD35", "CPYD25", "CPYD30",
    "CPD15", "CPD20", "CPD25", "CBD15", "CDD14",
  ],
  "Crown": [
    "SC4500", "SC5300", "SC6000", "FC5200", "C-5",
    "RR5700", "RM6000", "RC5500", "SP3500", "PE4500",
  ],
  "Hangcha": [
    "CPCD25", "CPCD30", "CPCD35", "CPYD25", "CPYD30",
    "CPD15", "CPD20", "CPD25", "XF25", "XF30",
  ],
  "Doosan": [
    "GC25E", "GC30E", "D25S", "D30S", "D35C",
    "B16X", "B20X", "B25X", "BR16JW", "PB45T",
  ],
  "Clark": [
    "C25", "C30", "C35", "CGC25", "CGP25",
    "GTX25", "ECX20", "ECX25", "WPX45", "NPX17",
  ],
  "CAT": [
    "DP25N", "DP30N", "GP25N", "GP30N", "2EC25",
    "2EC30", "EC25LN2", "NR16N2", "NPF20N", "NSP20N",
  ],
  "Raymond": [
    "4250", "4400", "5400", "5500", "7400",
    "7720", "8210", "8410", "8910", "9700",
  ],
  "Linde": [
    "H25", "H30", "H35", "E25", "E30",
    "E35", "R14", "R16", "T20", "N20",
  ],
  "Jungheinrich": [
    "EFG216", "EFG220", "ETV214", "ETV216", "ETM216",
    "EKS210", "ESE220", "EJC212", "EZS350", "AME13",
  ],
  "Komatsu": [
    "FG25T", "FG30T", "FD25T", "FD30T", "FD40T",
    "FB20", "FB25", "FB30", "FB16RW", "FB15S",
  ],
};

export const SYSTEMS = [
  "Won't Start",
  "Steering",
  "Mast / Hydraulic",
  "Brakes",
  "Trans / Drivetrain",
  "Electrical / Controls",
  "Cooling",
  "Noise",
  "Other",
];

export const FAILURE_TYPES = [
  "Wear",
  "Leak",
  "Corrosion",
  "Crack / Break",
  "Electrical fault",
  "Contamination",
  "Adjustment",
  "Seized",
  "Reference / Good Condition",
];

// ─── Diagnostic Funnel Data ─────────────────────────────────────────────────
// Rich brand definitions keyed by id (used by the diagnostic funnel).
// Cross-references BRANDS for the model list so there's one source of truth.
export const DIAGNOSTIC_BRANDS = {
  toyota: { name: "Toyota", models: BRANDS["Toyota"], icon: "▲" },
  yale_hyster: { name: "Yale / Hyster", models: BRANDS["Yale / Hyster"], icon: "◆" },
  mitsubishi_unicarrier: { name: "Mitsubishi / Unicarrier", models: BRANDS["Mitsubishi / Unicarrier"], icon: "●" },
  heli: { name: "Heli", models: BRANDS["Heli"], icon: "■" },
  crown: { name: "Crown", models: BRANDS["Crown"], icon: "♛" },
  hangcha: { name: "Hangcha", models: BRANDS["Hangcha"], icon: "▽" },
  doosan: { name: "Doosan", models: BRANDS["Doosan"], icon: "◇" },
  clark: { name: "Clark", models: BRANDS["Clark"], icon: "✦" },
  cat: { name: "CAT", models: BRANDS["CAT"], icon: "▰" },
  raymond: { name: "Raymond", models: BRANDS["Raymond"], icon: "►" },
  linde: { name: "Linde", models: BRANDS["Linde"], icon: "◐" },
  jungheinrich: { name: "Jungheinrich", models: BRANDS["Jungheinrich"], icon: "✚" },
  komatsu: { name: "Komatsu", models: BRANDS["Komatsu"], icon: "◎" },
};

export const SYMPTOM_CATEGORIES = [
  { id: "no_start", label: "Won't Start / No Crank", icon: "⚡", color: "#ff4444" },
  { id: "steering", label: "Steering Issue", icon: "↻", color: "#ff8800" },
  { id: "mast_hydraulic", label: "Mast / Hydraulic", icon: "⬆", color: "#ffcc00" },
  { id: "brakes", label: "Brake Problem", icon: "⬛", color: "#cc44ff" },
  { id: "transmission", label: "Trans / Drivetrain", icon: "⚙", color: "#4488ff" },
  { id: "electrical", label: "Electrical / Controls", icon: "⚡", color: "#44ccff" },
  { id: "overheating", label: "Overheating", icon: "🔥", color: "#ff2200" },
  { id: "noise", label: "Unusual Noise", icon: "◉", color: "#88cc44" },
];

// Maps a diagnostic symptom id to the corresponding SYSTEMS label used by the
// media library's `system` field. Lets the results screen cross-link to media.
export const SYMPTOM_TO_SYSTEM = {
  no_start: "Won't Start",
  steering: "Steering",
  mast_hydraulic: "Mast / Hydraulic",
  brakes: "Brakes",
  transmission: "Trans / Drivetrain",
  electrical: "Electrical / Controls",
  overheating: "Cooling",
  noise: "Noise",
};

export const DIAGNOSTIC_DATA = {
  toyota: {
    no_start: {
      tendencies: [
        "Seat switch / interlock failure — extremely common on 8-series. Switch connector corrodes.",
        "Key switch wear on 7FGCU series — intermittent contact internally.",
        "Neutral safety switch on auto-trans models — adjustment drifts over time.",
        "Ignition module failure on older 4Y engines — no spark condition.",
        "Battery terminal corrosion on electric models (8FBE) — high resistance at posts.",
      ],
      questions: [
        { q: "Does the dash light up when key is turned?", yes: "Starter circuit or engine/motor fault", no: "Power supply, key switch, or interlock issue" },
        { q: "Do you hear the starter engage at all?", yes: "Fuel/ignition issue or motor controller fault", no: "Starter, solenoid, or safety switch" },
        { q: "Is the seat switch bypassed or stock?", yes: "Check neutral switch and starter solenoid", no: "Test seat switch connector — corrosion common on 8-series" },
        { q: "Has the truck been sitting for extended time?", yes: "Check fuel quality, battery condition, carb/injector gumming", no: "Likely electrical fault — proceed to ignition diagnostics" },
      ],
    },
    steering: {
      tendencies: [
        "Orbital valve (steering control unit) wear on 7/8 series — causes sluggish or stiff steering.",
        "Steering cylinder seal leaks on 8FGCU — visible weeping at rod end.",
        "Column bearing wear on high-hour units — play felt at wheel before hydraulic response.",
        "Priority valve sticking in main hydraulic block — starves steering circuit under load.",
        "Steer axle king pin wear on 7FGCU25/30 — clunking during turns.",
      ],
      questions: [
        { q: "Is there play at the wheel before tires respond?", yes: "Column bearing, orbital valve, or linkage wear", no: "Hydraulic supply issue — pump, priority valve, or flow" },
        { q: "Is steering stiff in both directions equally?", yes: "Low flow — check pump, relief, priority valve", no: "Cylinder seal or orbital valve internal leak on one side" },
        { q: "Any visible hydraulic leaks at steer axle?", yes: "Cylinder seals — common on 8FGCU rod end", no: "Internal orbital valve wear or pump output low" },
        { q: "Does the issue worsen when engine is at low idle?", yes: "Flow-related — pump output drops at low RPM, check priority valve", no: "Mechanical wear — orbital, column, or linkage" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder drift on 8-series — packing wear allows slow bleed-down under load.",
        "Tilt cylinder seal failure — mast creeps forward when loaded, especially on high-hour units.",
        "Chain stretch on 7FGCU models — uneven fork height, chain tension inconsistent.",
        "Hydraulic control valve spool sticking — erratic mast movement, especially in cold conditions.",
        "Mast roller wear — binding or jerky travel through mid-stroke.",
      ],
      questions: [
        { q: "Does the load drift down slowly when held at height?", yes: "Lift cylinder packing or control valve check valve leaking", no: "Issue may be speed, responsiveness, or noise related" },
        { q: "Is mast movement jerky or uneven?", yes: "Roller wear, dry channels, or chain adjustment needed", no: "Hydraulic supply or valve issue" },
        { q: "Does the mast tilt forward on its own when loaded?", yes: "Tilt cylinder seals — very common on high-hour Toyota units", no: "Check control valve centering and return springs" },
        { q: "Any unusual noise during mast operation?", yes: "Roller condition, chain contact, or pump cavitation", no: "Proceed to flow/pressure testing" },
      ],
    },
    brakes: {
      tendencies: [
        "Brake master cylinder internal bypass on 8FGCU — pedal slowly sinks to floor.",
        "Wet disc brake wear on some transmission models — requires trans pull to inspect.",
        "Parking brake cable stretch on 7/8 series — adjustment maxes out, cable replacement needed.",
        "Brake booster vacuum leak on LP models — hard pedal, poor assist.",
        "Wheel cylinder leaks on older drum brake models (5/6 series).",
      ],
      questions: [
        { q: "Does the brake pedal slowly sink to the floor when held?", yes: "Master cylinder internal bypass — common on 8FGCU", no: "External leak, adjustment, or lining wear" },
        { q: "Is the pedal hard with poor stopping power?", yes: "Booster issue (LP) or lining glazed/contaminated", no: "Soft pedal points to hydraulic issue" },
        { q: "Does the parking brake hold on an incline with load?", yes: "Service brake issue — focus on hydraulic circuit", no: "Cable stretch, adjustment, or shoe wear" },
        { q: "Any fluid visible at wheels or master cylinder?", yes: "External leak — wheel cylinder or master cylinder seals", no: "Internal bypass or adjustment/lining issue" },
      ],
    },
    transmission: {
      tendencies: [
        "Inching valve wear on torque converter models — poor creep control, jerky engagement.",
        "Transmission oil overheating on 8FGCU30 — cooler line restrictions common.",
        "Directional solenoid failure — no forward or reverse engagement.",
        "Torque converter stall speed drift — sluggish acceleration, transmission slip feel.",
        "Speed sensor failure on electronic trans — erratic shifting or limp mode.",
      ],
      questions: [
        { q: "Does the truck engage forward/reverse smoothly?", yes: "Issue may be deeper — torque converter or clutch pack", no: "Inching valve, solenoid, or linkage adjustment" },
        { q: "Is there a delay before engagement when shifting?", yes: "Low fluid, worn clutch packs, or solenoid lag", no: "Check for slipping under load — converter or clutch" },
        { q: "Does the transmission overheat or smell burnt?", yes: "Cooler restriction, low fluid, or internal clutch wear — common on 8FGCU30", no: "Likely solenoid or electronic control issue" },
        { q: "Any warning lights or codes on dash?", yes: "Pull codes — speed sensor and solenoid faults common", no: "Mechanical issue — pressure test recommended" },
      ],
    },
    electrical: {
      tendencies: [
        "Instrument cluster failure on 8-series — dead gauges, no hour meter reading.",
        "Wiring harness chafe points near mast pivot — shorts and intermittent faults.",
        "Controller faults on 8FBE electrics — error codes require Toyota diagnostic software.",
        "Headlight/worklight wiring melts at connector — undersized factory wiring on some models.",
        "Horn switch failure in steering column — common wear item.",
      ],
      questions: [
        { q: "Are there any error codes displayed?", yes: "Document codes — Toyota uses specific flash code or display sequences", no: "Intermittent or non-code-generating fault" },
        { q: "Is the issue intermittent or constant?", yes: "Chafe point, loose connector, or thermal-related break", no: "Component failure — test specific circuit" },
        { q: "Does the problem happen when mast is raised or moving?", yes: "Harness routing near mast — chafe point very likely", no: "Check dash, controller, and main harness connectors" },
        { q: "Is this an electric truck with a controller error?", yes: "Will need Toyota BT diagnostic tool or compatible scanner", no: "Standard electrical diagnostics apply" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator fin clogging from warehouse dust/debris — common on all LP Toyota units.",
        "Thermostat failure on 4Y engine — stuck closed causes rapid overheat.",
        "Water pump impeller corrosion — flow drops before pump fails completely.",
        "Head gasket weep on high-hour 4Y engines — slow coolant loss, no visible external leak.",
        "Cooling fan clutch failure on 7-series — fan spins but doesn't pull enough air.",
      ],
      questions: [
        { q: "Does it overheat quickly (within minutes) or gradually?", yes: "Thermostat stuck closed or severe blockage", no: "Gradual overheat points to flow or capacity issue" },
        { q: "Is coolant level dropping with no visible leak?", yes: "Head gasket weep or internal crack — combustion gas test recommended", no: "Airflow or circulation problem" },
        { q: "Is the radiator visibly clogged with dust/debris?", yes: "Clean radiator core — #1 cause in warehouse environments", no: "Check thermostat, water pump, and fan operation" },
        { q: "Is the cooling fan spinning with good airflow?", yes: "Internal flow restriction — thermostat, pump, or blockage", no: "Fan clutch (7-series) or fan motor/belt issue" },
      ],
    },
    noise: {
      tendencies: [
        "Mast chain slap on 8-series — chain tension spec is critical, often overlooked.",
        "Transmission whine on 7FGCU — bearing wear inside converter housing.",
        "Hydraulic pump cavitation — aerated oil from low level or suction leak.",
        "Exhaust leak at manifold on 4Y engine — studs corrode and break.",
        "Drive axle bearing growl — worsens under load and turning.",
      ],
      questions: [
        { q: "When does the noise occur — driving, lifting, or both?", yes: "Driving = drivetrain/axle; Lifting = hydraulic/mast", no: "Constant noise may be engine/pump accessory" },
        { q: "Does the noise change with engine RPM?", yes: "Engine-driven component — pump, fan, alternator, or exhaust", no: "Likely ground-speed related — axle, trans, or tire" },
        { q: "Is there a metallic rattling or knocking?", yes: "Chain slack, exhaust leak, or loose component", no: "Whine or hum = bearings, pump, or gear mesh" },
        { q: "Does the noise get louder under hydraulic load?", yes: "Pump cavitation, relief valve chatter, or low oil", no: "Drivetrain or engine accessory source" },
      ],
    },
  },

  yale_hyster: {
    no_start: {
      tendencies: [
        "Seat switch / operator presence system — common failure, especially on VX-series Yale units.",
        "PCM (Powertrain Control Module) communication loss on newer S/H series Hyster — CAN bus faults.",
        "LPG lockoff solenoid failure — no fuel delivery, common after sitting.",
        "Starter solenoid contact plate wear on Mazda FE engine platforms — cranks weak then fails.",
        "Key switch / ignition barrel wear on older Yale GLP models.",
      ],
      questions: [
        { q: "Does the dash power up with key on?", yes: "Crank circuit or fuel delivery fault", no: "Power supply, fuse, key switch, or interlock" },
        { q: "Do you hear clicking at the starter?", yes: "Starter contact plate or battery/cable — test voltage drop", no: "Interlock, neutral switch, or wiring open" },
        { q: "Is this an LPG unit that has been sitting?", yes: "LPG lockoff solenoid and regulator — prime and test", no: "Focus on ignition and crank circuits" },
        { q: "Any check engine or warning lights staying on?", yes: "Pull PCM codes — CAN bus and sensor faults common on S/H series", no: "Basic electrical — switches, relays, solenoid" },
      ],
    },
    steering: {
      tendencies: [
        "Steer orbital (BZZ type) wear on Yale GLP/GDP — spongey or delayed response.",
        "Steer cylinder rod seal leaks on Hyster H-series — visible oil at rod.",
        "Steer axle thrust bearing wear — clunk felt in wheel during direction change.",
        "Priority valve failure in main pump — steering loses assist under hydraulic load.",
        "Tie rod end wear on high-hour Yale/Hyster cushion tire units.",
      ],
      questions: [
        { q: "Does steering feel spongy or delayed?", yes: "Orbital valve wear (BZZ type) — very common on GLP/GDP", no: "Flow or mechanical issue" },
        { q: "Does steering get worse when lifting at the same time?", yes: "Priority valve not giving steering circuit preference", no: "Dedicated steering issue — cylinder or orbital" },
        { q: "Any clunking when turning or reversing direction?", yes: "Steer axle thrust bearing or tie rod ends", no: "Hydraulic side — orbital, cylinder seals, or pump" },
        { q: "Visible oil leaking at steer cylinder?", yes: "Rod seal replacement needed — common on H-series", no: "Internal wear — orbital valve or pump output" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder drift on Hyster S/H series — common seal wear pattern around 5000-7000 hours.",
        "Sideshift cylinder leaking on integrated carriages — seal kits frequently needed.",
        "Mast channel roller flat spots on Yale GLP — causes jerky lift/lower.",
        "Hydraulic valve bank spool sticking on VX-series — especially in cold starts.",
        "Chain anchor bolt loosening on Hyster H-series — fork height inconsistency.",
      ],
      questions: [
        { q: "Does the load slowly lower when held at height?", yes: "Lift cylinder seals or check valve in valve bank", no: "Speed, control, or noise issue" },
        { q: "Is lift/lower motion jerky or inconsistent?", yes: "Mast rollers (flat spots common on Yale GLP) or chain tension", no: "Valve or flow issue" },
        { q: "Does the issue only happen on cold start?", yes: "Valve spool sticking — VX-series known issue, oil viscosity related", no: "Wear item — seals, rollers, or chains" },
        { q: "Is the sideshift drifting or leaking?", yes: "Sideshift cylinder seal kit — common service item", no: "Main mast hydraulic circuit" },
      ],
    },
    brakes: {
      tendencies: [
        "Brake master cylinder failure on Yale GLP — internal bypass, pedal fades.",
        "Wet disc brake wear inside transmission on Hyster S/H — requires trans removal.",
        "Parking brake auto-adjust mechanism jamming on newer Yale units.",
        "Brake pedal return spring weak or broken — pedal stays down or slow return.",
        "Brake line corrosion on units used in wash-down environments.",
      ],
      questions: [
        { q: "Does the pedal slowly fade to the floor?", yes: "Master cylinder internal bypass — Yale GLP common failure", no: "External issue or adjustment" },
        { q: "Is this a powershift trans with internal wet brakes?", yes: "Clutch/brake pack wear — transmission service needed (Hyster S/H)", no: "External service brake system" },
        { q: "Does the parking brake hold properly?", yes: "Focus on service brake hydraulics", no: "Auto-adjust mechanism or cable/shoe wear" },
        { q: "Any brake drag or one-sided pulling?", yes: "Wheel cylinder sticking or line restriction", no: "System-wide — master cylinder, booster, or fluid" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift transmission clutch pack wear on Hyster S50/60FT — hard shifts, slipping.",
        "Inching / creep valve failure on Yale GLP — no modulation between full engage and neutral.",
        "Transmission cooler hose blowout on H-series — sudden fluid loss.",
        "Directional control valve solenoid — stuck in one direction or neutral.",
        "Transmission ECU faults on newer Hyster units — requires laptop diagnostics.",
      ],
      questions: [
        { q: "Does the truck shift hard into forward or reverse?", yes: "Clutch pack wear or inching valve issue", no: "May be slipping or not engaging" },
        { q: "Is there complete loss of drive in one direction?", yes: "Directional solenoid or clutch pack failure", no: "Partial engagement — pressure or modulation issue" },
        { q: "Any sudden fluid loss or overheating?", yes: "Cooler hose blowout (H-series) or internal seal failure", no: "Electronic or valve issue" },
        { q: "Are there diagnostic codes stored?", yes: "Transmission ECU fault — Hyster requires laptop-based diagnostics", no: "Mechanical — pressure test and fluid inspection" },
      ],
    },
    electrical: {
      tendencies: [
        "CAN bus communication errors on newer Hyster/Yale — instrument cluster goes blank.",
        "Wiring harness damage from battery acid on sit-down electrics.",
        "Display/instrument panel failure on VX-series Yale — known board issue.",
        "Contactor welding on Yale electric models — truck creeps or won't stop.",
        "Fuse box corrosion — intermittent power loss to multiple circuits.",
      ],
      questions: [
        { q: "Is the instrument cluster blank or flickering?", yes: "CAN bus fault or display board failure (VX-series known issue)", no: "Specific circuit or component" },
        { q: "Is this an electric truck with drive issues?", yes: "Contactor check — welded contacts cause uncontrolled creep (SAFETY CRITICAL)", no: "LP/diesel electrical — harness, sensors, or controller" },
        { q: "Are multiple systems affected simultaneously?", yes: "Fuse box corrosion or main harness ground issue", no: "Single circuit — trace wiring from component back" },
        { q: "Any signs of battery acid damage under the hood or in compartment?", yes: "Harness acid damage — inspect full run, common on electrics", no: "Standard electrical diagnostics" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator plugging on Hyster S/H with Mazda FE engine — warehouse dust accumulation.",
        "Thermostat housing gasket leak on Yale GLP — slow external coolant loss.",
        "Water pump seal weep on Mazda FE — drip from weep hole before full failure.",
        "Cylinder head crack on GM 3.0L (some Yale models) — overheats and pushes coolant.",
        "Cooling fan relay or temp switch failure — fan doesn't activate.",
      ],
      questions: [
        { q: "Is coolant being pushed out or boiling over?", yes: "Head gasket or cracked head — combustion gas test needed", no: "Cooling system efficiency issue" },
        { q: "Is there a slow external coolant leak?", yes: "Thermostat housing gasket or water pump weep (Mazda FE)", no: "Internal issue or airflow problem" },
        { q: "Is the cooling fan running when engine is hot?", yes: "Restriction — radiator plugging, thermostat, or pump", no: "Fan relay, temp switch, or wiring fault" },
        { q: "Has the coolant been changed on schedule?", yes: "Check for internal blockage or component failure", no: "Flush system — corrosion buildup common on neglected units" },
      ],
    },
    noise: {
      tendencies: [
        "Transmission bearing whine on Hyster S-series — front pump area, worsens in gear.",
        "Exhaust manifold crack on Mazda FE engine — ticking noise, especially cold.",
        "LPG regulator buzz/vibration on Yale GLP — diaphragm wear.",
        "Mast chain rattle on Hyster — chain tension and anchor bolt check.",
        "Drive axle ring gear noise on high-hour units — gear mesh pattern wear.",
      ],
      questions: [
        { q: "Is the noise present at idle or only in motion?", yes: "Idle = engine/accessory; Motion = drivetrain", no: "Intermittent — temperature or load related" },
        { q: "Does it sound like a tick or crack from exhaust area?", yes: "Exhaust manifold crack — Mazda FE common, especially cold", no: "Not exhaust related" },
        { q: "Is there a buzzing from the fuel system area?", yes: "LPG regulator diaphragm wear — Yale GLP known issue", no: "Mechanical — bearings, gears, or chain" },
        { q: "Does the noise change in neutral vs in gear?", yes: "Transmission — front pump or input bearing (Hyster S-series)", no: "Engine, axle, or mast related" },
      ],
    },
  },

  mitsubishi_unicarrier: {
    no_start: {
      tendencies: [
        "Operator presence system / seat switch — common fault on FGC-N series.",
        "Fuel pump relay failure on FGC25N/30N — relay clicks but no fuel pressure.",
        "ECU water intrusion on older FD diesel models — causes no-start or limp mode.",
        "Ignition coil failure on 4G64 engine — weak spark or misfire.",
        "Battery disconnect switch left off or loose — common operator error.",
      ],
      questions: [
        { q: "Does the engine crank but not fire?", yes: "Fuel delivery or ignition — check spark and fuel pressure", no: "Crank circuit — starter, interlock, or battery" },
        { q: "Is the seat switch / OPS light on?", yes: "Operator presence system fault — common on FGC-N series", no: "Not interlock related" },
        { q: "Can you hear the fuel pump prime with key on?", yes: "Pump works — check spark, ignition coil (4G64 common)", no: "Fuel pump relay — clicks but no output, known failure" },
        { q: "Has the truck been exposed to rain or wash-down?", yes: "ECU water intrusion — especially older FD diesels", no: "Standard no-start diagnostics" },
      ],
    },
    steering: {
      tendencies: [
        "Orbital valve wear on FGC-N series — gradual loss of steering response.",
        "Steer cylinder pin and bushing wear — clunking noise, loose feel.",
        "Priority flow divider failure — steering struggles when mast is in use.",
        "Steering column U-joint wear on high-hour FGC units — notchy steering feel.",
        "Steer axle tie rod end play on Unicarrier PF-series reach trucks.",
      ],
      questions: [
        { q: "Is the steering notchy or catching at certain points?", yes: "Column U-joint wear — high-hour FGC known issue", no: "Hydraulic side — orbital, flow, or cylinder" },
        { q: "Does steering degrade when lifting simultaneously?", yes: "Priority flow divider failure — steering starved", no: "Dedicated steering circuit fault" },
        { q: "Is there a clunk at the steer axle?", yes: "Cylinder pin/bushing wear or tie rod ends", no: "Orbital valve or column issue" },
        { q: "Is response slow but smooth?", yes: "Orbital valve wear — gradual deterioration on FGC-N", no: "Mechanical or flow restriction" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder drift on FGC25N/30N — seal wear accelerates with dirty oil.",
        "Free-lift cylinder issues on triple mast configurations — inner stage sticking.",
        "Tilt cylinder creep under load — pin bushings contribute to perceived drift.",
        "Hydraulic hose routing contact with mast — chafe-through and sudden leak.",
        "Control valve detent issues — lever won't stay in position.",
      ],
      questions: [
        { q: "Does the load slowly drift down?", yes: "Lift cylinder seals or control valve check — check oil condition first", no: "Control, speed, or mechanical issue" },
        { q: "Is this a triple stage mast with inner stage problems?", yes: "Free-lift cylinder sticking — common on Mitsubishi triple mast configs", no: "Standard mast diagnostics" },
        { q: "Are the hydraulic hoses rubbing on any mast components?", yes: "Re-route and inspect for chafe damage — sudden leak risk", no: "Internal hydraulic issue" },
        { q: "Do the control levers hold position properly?", yes: "Internal valve or cylinder issue", no: "Detent mechanism in control valve — adjustment or rebuild" },
      ],
    },
    brakes: {
      tendencies: [
        "Brake master cylinder internal bypass on FGC-N series — gradual pedal fade.",
        "Parking brake cable seizing on FGC units in wet/dirty environments.",
        "Brake drum scoring on FD diesel models — heavy loads accelerate wear.",
        "Brake fluid contamination from moisture ingress — spongy pedal feel.",
        "Wheel cylinder sticking on older Mitsubishi units — one-sided pull.",
      ],
      questions: [
        { q: "Is the brake pedal gradually fading?", yes: "Master cylinder internal bypass — FGC-N common failure", no: "External or adjustment issue" },
        { q: "Does the parking brake release fully?", yes: "Service brake focus", no: "Cable seizing — common in dirty environments on FGC" },
        { q: "Is there a pull to one side when braking?", yes: "Wheel cylinder sticking or drum scoring uneven", no: "System-wide issue — master, fluid, or adjustment" },
        { q: "When was brake fluid last changed?", yes: "Check for contamination — moisture ingress causes spongy feel", no: "Flush recommended — Mitsubishi sensitive to moisture contamination" },
      ],
    },
    transmission: {
      tendencies: [
        "Clutch pack wear on FGC powershift models — hard engagement, especially cold.",
        "Transmission oil screen clogging on FGC25N — restricted flow causes overheat.",
        "Solenoid valve failure — intermittent loss of forward or reverse.",
        "Inching control cable adjustment drift — poor modulation between drive and neutral.",
        "Torque converter stator failure on high-hour FGC30N — poor acceleration and overheating.",
      ],
      questions: [
        { q: "Is engagement harsh, especially when cold?", yes: "Clutch pack wear — FGC powershift common, oil condition critical", no: "Warm operation issue — solenoid or torque converter" },
        { q: "Does the transmission overheat during sustained work?", yes: "Oil screen clogging (FGC25N) or torque converter stator failure", no: "Engagement or control issue" },
        { q: "Is forward or reverse intermittently lost?", yes: "Solenoid valve failure — test electrically and hydraulically", no: "Mechanical — clutch pack, converter, or pump" },
        { q: "Is the inching pedal modulation poor?", yes: "Inching cable adjustment drift — recalibrate per spec", no: "Internal transmission issue" },
      ],
    },
    electrical: {
      tendencies: [
        "ECU connector corrosion on FGC-N — causes intermittent codes and drivability issues.",
        "Instrument cluster LCD failure on older Mitsubishi models — segments drop out.",
        "Wire loom damage from battery compartment acid on FB electric series.",
        "Throttle position sensor failure on 4G64 — erratic engine response.",
        "Controller board failure on Unicarrier electrics — requires OEM replacement.",
      ],
      questions: [
        { q: "Are there intermittent fault codes that come and go?", yes: "ECU connector corrosion — FGC-N known issue, clean and reseal", no: "Consistent fault — specific component failure" },
        { q: "Is the dash display showing missing segments?", yes: "LCD failure on older Mitsubishi clusters — replacement needed", no: "Full display but wrong readings — sensor or input issue" },
        { q: "Is engine response erratic or surging?", yes: "Throttle position sensor — 4G64 common failure", no: "Other electrical — check harness and grounds" },
        { q: "Is this an electric Unicarrier with controller issues?", yes: "Controller board — typically OEM only, check for software updates first", no: "Standard Mitsubishi electrical diagnostics" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator core plugging on FGC — Mitsubishi uses smaller cores, clogs faster.",
        "Thermostat failure on 4G64 engine — stuck closed is most common mode.",
        "Coolant crossover gasket leak on FGC25N — external leak from block/head junction.",
        "Fan belt slip on FD diesel models — belt tension and condition critical.",
        "Water pump bearing failure on high-hour 4G64 — noise precedes overheat.",
      ],
      questions: [
        { q: "How quickly does it overheat?", yes: "Fast = thermostat stuck closed; Gradual = flow/capacity issue", no: "Only under heavy load — check fan, radiator capacity" },
        { q: "Any visible coolant leak?", yes: "Crossover gasket on FGC25N or water pump seal", no: "Internal or airflow issue" },
        { q: "Is there noise from the water pump area?", yes: "Bearing failure — 4G64 high-hour units, replace before overheat", no: "Check thermostat, radiator, and belt" },
        { q: "Is the fan belt in good condition and properly tensioned?", yes: "Not belt — thermostat, radiator, or internal blockage", no: "Belt slip on FD diesels — common cause, easy fix" },
      ],
    },
    noise: {
      tendencies: [
        "Timing chain rattle on 4G64 engine — cold start noise, tensioner wear.",
        "LPG mixer/regulator vibration on FGC — buzzing noise at certain RPMs.",
        "Mast chain contact noise — Mitsubishi chain routing can cause scrape on channels.",
        "Transmission pump whine on FGC powershift — filter restriction amplifies it.",
        "Exhaust flex pipe crack on FGC25N — develops rattle/tick.",
      ],
      questions: [
        { q: "Is there a rattle on cold start that goes away warm?", yes: "Timing chain tensioner — 4G64 common, don't ignore it", no: "Consistent noise — not timing chain" },
        { q: "Is there a buzz at specific RPM ranges?", yes: "LPG mixer/regulator vibration — check mounting and diaphragm", no: "Mechanical — engine, trans, or drivetrain" },
        { q: "Is the noise from the mast area during operation?", yes: "Chain routing contact on channels — inspect guides and routing", no: "Powerplant or drivetrain noise" },
        { q: "Does the noise get louder over time?", yes: "Progressive wear — transmission pump (check filter) or bearing", no: "Static issue — exhaust, mounting, or resonance" },
      ],
    },
  },

  heli: {
    no_start: {
      tendencies: [
        "Fuel solenoid (lockoff) failure on CPYD LPG models — clicks but no fuel delivery.",
        "Xinchai 490 injector pump timing drift on CPCD diesels — long crank, hard start when warm.",
        "Seat switch / OPS connector corrosion on CPCD25/30 — Chinese-sourced connector seals fail early.",
        "Battery main isolator switch loose on CPD electrics — intermittent power loss to controller.",
        "Starter solenoid contact plate wear on early Heli units — cranks slow then quits.",
      ],
      questions: [
        { q: "Does the dash power up with key on?", yes: "Crank or fuel delivery side", no: "Power supply — main isolator, key switch, or fuse box" },
        { q: "Is this an LPG truck that worked yesterday and won't today?", yes: "Lockoff solenoid clicks but fails to open — common Heli LPG failure", no: "Different fault path" },
        { q: "Diesel engine cranking but not catching?", yes: "Xinchai injection pump timing or weak lift pump — common after high hours", no: "Spark/ignition or interlock" },
        { q: "Is the OPS / seat light on with operator seated?", yes: "Seat switch connector corrosion — reseat / replace, very common on CPCD", no: "Not interlock" },
      ],
    },
    steering: {
      tendencies: [
        "Steer orbital (BZZ) seal weep on CPCD — visible oil under truck after sitting.",
        "Priority valve sticking in main hydraulic block — steering goes heavy when lifting.",
        "Steer cylinder rod pitting from outdoor storage — accelerates seal wear.",
        "Tie rod end play on H3-series — easy to overlook, causes wandering.",
        "Steering column lower U-joint wear on high-hour CPD electrics.",
      ],
      questions: [
        { q: "Is steering heavier when lifting at the same time?", yes: "Priority valve — not giving steering circuit preference", no: "Dedicated steering issue" },
        { q: "Any oil pooling under the front of the truck overnight?", yes: "Orbital seal weep or cylinder rod seal — Heli BZZ unit common", no: "Internal wear, no external leak" },
        { q: "Does the truck wander on a straight line?", yes: "Tie rod ends or king pin play — H3 series check", no: "Hydraulic side of system" },
        { q: "Is there a notchy feel through the wheel?", yes: "Column U-joint wear — high-hour CPD known issue", no: "Hydraulic — orbital or cylinder" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Tilt cylinder seal failure on CPCD25/30 — mast creep forward under load.",
        "Chain anchor bolt loosens on CPCD — fork height drifts uneven over weeks.",
        "Mast roller wear from running dry — Heli factory grease intervals too long for dusty sites.",
        "Hydraulic control valve detent spring weak — lever drifts back to neutral too easily.",
        "Lift cylinder packing wear on early CPD electric reach — slow drift under load.",
      ],
      questions: [
        { q: "Does the load slowly drift down when held at height?", yes: "Lift cylinder packing or valve check ball — common Heli CPD wear", no: "Speed, control, or noise issue" },
        { q: "Does the mast tilt forward on its own under load?", yes: "Tilt cylinder seals — CPCD25/30 wear pattern", no: "Check tilt valve centering" },
        { q: "Forks at uneven height after weeks of use?", yes: "Chain anchor bolt loosening — Heli CPCD chain anchor needs retorque check", no: "Wear or chain stretch" },
        { q: "Is mast travel rough or chattering?", yes: "Mast rollers dry — increase grease frequency on Heli per dusty-site spec", no: "Hydraulic flow issue" },
      ],
    },
    brakes: {
      tendencies: [
        "Master cylinder bypass on CPCD25/30 — pedal slowly sinks, common Chinese MC failure mode.",
        "Parking brake cable adjustment maxes out on CPCD — cable stretch is severe on early Heli.",
        "Brake drum scoring on CPD15/20 from pad contamination — squeals then grabs.",
        "Wheel cylinder seal failure on older CPCD — external leak at wheel hub area.",
        "Brake fluid hygroscopic absorption — Heli OEM fluid spec sensitive to humidity.",
      ],
      questions: [
        { q: "Does the pedal slowly fade to the floor when held?", yes: "Master cylinder internal bypass — common Heli CPCD failure", no: "External leak or adjustment" },
        { q: "Does the parking brake hold on an incline with load?", yes: "Service brake hydraulic focus", no: "Cable stretch — early Heli units very prone to this" },
        { q: "Any fluid weeping at wheel cylinders?", yes: "Wheel cylinder seal failure — common on older CPCD", no: "System-wide hydraulic issue" },
        { q: "When was brake fluid last changed?", yes: "Check for water contamination — Heli spec sensitive to moisture", no: "Flush and bleed system" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on CPCD30/35 — hard engagement when cold, slips when hot.",
        "Inching valve adjustment cable seizing in dusty environments — no creep control.",
        "Directional solenoid coil burnout on CPCD — no forward or no reverse intermittent.",
        "Torque converter input shaft seal leak — trans fluid loss with no external puddle.",
        "Transmission oil cooler restriction on Heli IC trucks — overheats under sustained work.",
      ],
      questions: [
        { q: "Is engagement hard when cold and slipping when hot?", yes: "Clutch pack wear — CPCD30/35 known wear point", no: "Different transmission fault" },
        { q: "Is there intermittent loss of forward or reverse?", yes: "Directional solenoid coil — test resistance, common Heli failure", no: "Mechanical or hydraulic" },
        { q: "Poor inching pedal modulation?", yes: "Inching cable seized or out of adjustment — common in dusty sites", no: "Internal hydraulic issue" },
        { q: "Does transmission overheat under sustained load?", yes: "Cooler restriction — clean cooler core first, Heli runs small cores", no: "Internal wear — pressure test" },
      ],
    },
    electrical: {
      tendencies: [
        "Wiring harness chafe at mast pivot on CPCD — early Heli routing doesn't account for mast travel well.",
        "Fuse box corrosion on CPD electrics — sealing was weak on early units.",
        "Instrument cluster failure on CPCD — backlight and segment dropouts.",
        "Controller water intrusion on CPD electric reach trucks used in wash-down areas.",
        "Battery discharge indicator (BDI) calibration drift on CPD — false low-charge alerts.",
      ],
      questions: [
        { q: "Are the issues happening when the mast is fully raised?", yes: "Mast pivot harness chafe — Heli CPCD common, inspect at full lift", no: "Different fault location" },
        { q: "Multiple unrelated circuits acting up?", yes: "Fuse box corrosion — CPD known issue, clean and reseal", no: "Single-circuit fault — trace component" },
        { q: "Is this an electric truck used in wash-down or wet areas?", yes: "Controller water intrusion — check sealing, common CPD failure", no: "Standard electrical diagnostics" },
        { q: "Does the BDI show low charge on a freshly charged battery?", yes: "BDI calibration — recalibrate per Heli service manual", no: "Charging or battery issue" },
      ],
    },
    overheating: {
      tendencies: [
        "Small radiator core on CPCD — clogs faster than Japanese/American units, especially in lumber/recycling yards.",
        "Thermostat stuck closed on Xinchai 490 — common failure mode, fast overheat.",
        "Water pump bearing failure on Xinchai engines — squeal precedes overheat by weeks.",
        "Coolant crossover gasket leak on CPCD30 — external coolant loss at block/head junction.",
        "Fan belt slip on CPCD diesels — Heli belt tensioner spec critical, often overlooked.",
      ],
      questions: [
        { q: "How fast does it overheat?", yes: "Within minutes = thermostat stuck closed or radiator severely clogged", no: "Gradual — flow/capacity issue" },
        { q: "Is the radiator visibly clogged with debris?", yes: "Clean core — Heli runs smaller cores, especially critical in dusty sites", no: "Check thermostat, pump, fan" },
        { q: "Any noise from the water pump area?", yes: "Water pump bearing — Xinchai 490 wear pattern, replace before failure", no: "Other cooling component" },
        { q: "Is the fan belt tight and in good shape?", yes: "Not belt — focus on flow or capacity", no: "Belt slip — Heli tensioner spec, common cause" },
      ],
    },
    noise: {
      tendencies: [
        "Xinchai 490 injector tick on CPCD — gets louder as injectors wear.",
        "Drive axle bearing growl on CPCD30 — worsens under turning load.",
        "Hydraulic pump cavitation on Heli — aerated oil from low tank or suction leak, common on cold starts.",
        "Mast chain rattle on CPCD — Heli chain tension spec is loose-feeling; verify with chain gauge.",
        "Exhaust manifold gasket leak on Xinchai — ticking that worsens with engine temp.",
      ],
      questions: [
        { q: "Is there a ticking that matches engine RPM?", yes: "Injector wear (Xinchai 490) or exhaust manifold gasket", no: "Not engine-driven" },
        { q: "Whining or buzzing during lift only?", yes: "Hydraulic pump cavitation — check oil level and suction line", no: "Drivetrain or engine noise" },
        { q: "Growl under turning load?", yes: "Drive axle bearing — CPCD30 common high-hour wear", no: "Other drivetrain source" },
        { q: "Mast chain rattle at rest height?", yes: "Chain tension — Heli spec, retension per service manual", no: "Mast roller or guide noise" },
      ],
    },
  },

  crown: {
    no_start: {
      tendencies: [
        "Access controller (AC1/AC2/AC3) fault code stored — Crown drive system locks out until cleared.",
        "Battery Discharge Indicator (BDI) lockout — controller refuses operation below threshold even after charge.",
        "Key switch barrel wear on SC-series — intermittent contact internally.",
        "P-handle / TSP throttle sensor on RC/RM stand-ups — failure presents as 'won't move' not 'won't start'.",
        "FC5200 IC truck: GM 2.4L ignition coil failure — weak spark, hard hot start.",
      ],
      questions: [
        { q: "Is this an electric Crown with a code on the display?", yes: "Pull Access controller codes — Crown OEM scanner or shorting plug procedure", no: "No code displayed — different path" },
        { q: "Was the battery deeply discharged recently?", yes: "BDI lockout — fully charge AND verify charger reset state", no: "Not BDI related" },
        { q: "Is this a stand-up (RC/RM) refusing to drive when operator presents?", yes: "P-handle/TSP throttle sensor or operator presence — common Crown wear", no: "Different interlock or fault" },
        { q: "Is this an FC5200 IC with hard hot start?", yes: "Ignition coil weakness — GM 2.4L failure mode", no: "Not ignition coil" },
      ],
    },
    steering: {
      tendencies: [
        "AC steer motor encoder fault on SC-series — drift in steering wheel-to-tire correspondence.",
        "Drive unit hex coupling wear on RR reach trucks — clunk and slop at the wheel.",
        "Tie rod end wear on RC stand-up — clunking on direction reversal.",
        "Steer encoder coupling shear pin failure — full loss of steering response, code stored.",
        "Hydraulic steering on FC5200 IC: orbital wear, common after 6000 hours.",
      ],
      questions: [
        { q: "Is this an electric Crown with a steering fault code?", yes: "Steer encoder or encoder coupling — Crown known wear point", no: "Mechanical or hydraulic fault" },
        { q: "Is there clunk at the steer wheel during reversal?", yes: "Tie rod ends (RC) or hex coupling (RR) — inspect for play", no: "Other source" },
        { q: "Does the steering wheel angle not match the tire angle?", yes: "Steer encoder calibration drift — Crown recalibration procedure", no: "Mechanical wear" },
        { q: "Is this an FC5200 IC truck with heavy steering?", yes: "Hydraulic orbital wear — FC5200 6000hr+ common", no: "Electric truck — encoder side" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "RR reach truck lift chain stretch — fork tip-down condition; chain replacement per Crown spec.",
        "Mast scanner / load wheel sensor fault on RR — locks out at certain heights.",
        "Free-lift cylinder seal failure on RR5700 — inner stage drops slowly under load.",
        "Hydraulic hose chafe at mast carriage on RR — sudden burst risk under high lift.",
        "Joystick lift sensor wear on SP order picker — uncommanded lift creep.",
      ],
      questions: [
        { q: "Is this an RR reach with forks tipping down under no load?", yes: "Lift chain stretch — measure per Crown chain spec, replace if over limit", no: "Different mast issue" },
        { q: "Does the truck stop lifting at a specific height?", yes: "Mast scanner / load sensor — RR known fault location", no: "Hydraulic flow or pressure" },
        { q: "Does the inner stage on RR drop slowly when held?", yes: "Free-lift cylinder seal — RR5700 wear pattern", no: "Main lift cylinder or valve" },
        { q: "Order picker with creeping lift command?", yes: "Joystick lift sensor wear — SP3500/4500 common", no: "Other lift control issue" },
      ],
    },
    brakes: {
      tendencies: [
        "Regen brake calibration drift on SC-series — controller-controlled braking feels weak.",
        "Auto-park brake fault on RC stand-up — truck won't release after operator dismount/remount.",
        "Service brake by-wire sensor fault on SC6000 — pedal works but no braking response.",
        "FC5200 IC: wheel cylinder corrosion from acid wash environments.",
        "Parking brake friction disc wear on RR — won't hold on grade with load.",
      ],
      questions: [
        { q: "Is this an electric Crown with weak braking feel?", yes: "Regen calibration drift — Crown recalibration procedure, controller-side", no: "Different braking system" },
        { q: "Is this an RC stand-up that won't release the parking brake?", yes: "Auto-park fault — check operator presence, sensor wiring, controller code", no: "Standard parking brake" },
        { q: "Brake pedal feels normal but no braking happens?", yes: "By-wire sensor fault — SC6000 known issue, safety critical", no: "Hydraulic or mechanical" },
        { q: "RR reach not holding on grade with load?", yes: "Parking brake friction disc — RR wear after high hours", no: "Service brake side" },
      ],
    },
    transmission: {
      tendencies: [
        "Drive motor bearing wear on SC AC drive — whine becomes growl, then code.",
        "Drive unit gear case oil seal leak — pink oil on floor under wheels.",
        "Hex coupling spline wear between motor and drive — clunk on direction change.",
        "FC5200 IC powershift: clutch pack wear, harsh engagement when cold.",
        "Traction control parameter drift in Access controller — laggy or jerky acceleration.",
      ],
      questions: [
        { q: "Is this an electric Crown with whining from drive wheels?", yes: "Drive motor bearing — replace before total failure, common SC wear", no: "Different drive fault" },
        { q: "Pink/red fluid under the truck near the drive wheels?", yes: "Drive unit oil seal leak — refill and replace seal, Crown service item", no: "Other fluid source" },
        { q: "Clunk on F-R direction change at low speed?", yes: "Hex coupling spline wear — inspect and replace if scored", no: "Other drivetrain source" },
        { q: "FC5200 with harsh cold engagement?", yes: "Powershift clutch pack wear — same playbook as other IC powershifts", no: "Not IC clutch issue" },
      ],
    },
    electrical: {
      tendencies: [
        "Access controller (AC1/AC2/AC3) hidden codes — common across SC/FC/RR series, scanner required.",
        "InfoLink wireless module battery dead — fleet tracking dropouts, easy fix often missed.",
        "Joystick sensor wear on SP order picker — multiple axis faults from one stick.",
        "Harness chafe at mast pivot on RR reach trucks — Crown routing prone to this on high-hour units.",
        "FC5200 IC: GM 2.4L throttle position sensor failure — surging and stalling.",
      ],
      questions: [
        { q: "Is there an Access controller code displayed?", yes: "Pull code with Crown OEM scanner — code lookup is the path forward", no: "No code — different fault path" },
        { q: "InfoLink fleet tracking dropping out?", yes: "InfoLink module battery — easy fix, check first before deeper diagnostics", no: "Not InfoLink related" },
        { q: "Order picker with multi-axis joystick faults?", yes: "Joystick sensor wear — SP order picker known failure, full replacement", no: "Other control issue" },
        { q: "Does the issue appear when mast is fully raised?", yes: "Mast pivot harness chafe — RR reach truck known wear", no: "Different routing or component" },
      ],
    },
    overheating: {
      tendencies: [
        "Traction motor overheat on SC under heavy duty cycle — duty rating exceeded by application.",
        "Controller heat sink fan failure on Access controller — drive cuts back power as temp rises.",
        "FC5200 IC: GM 2.4L radiator clogging, thermostat housing leak — same as other LP units.",
        "Lift pump motor overheat on RR — repeated lift cycles without cool-down trigger thermal cut.",
        "Battery overheat on SC — wrong charging profile or undersized battery for duty cycle.",
      ],
      questions: [
        { q: "Is this an electric truck running heavy duty cycle?", yes: "Likely duty rating exceeded — traction motor or lift pump thermal cutback", no: "Single-component failure" },
        { q: "Controller code for overtemp?", yes: "Heat sink fan or airflow blockage — check controller fan first", no: "Different overheat source" },
        { q: "Is the battery itself hot to the touch after charging?", yes: "Charging profile mismatch — verify charger settings vs battery spec", no: "Not battery thermal issue" },
        { q: "FC5200 IC with classic overheat symptoms?", yes: "Standard IC overheat diagnostics — radiator, thermostat, pump", no: "Electric truck — different system" },
      ],
    },
    noise: {
      tendencies: [
        "Drive motor bearing growl on SC AC drive — first wear point after thousands of hours.",
        "Lift pump motor whine on RR reach truck — bearing wear amplified by hydraulic load.",
        "Mast load wheel flat spots on RR — jerky lift accompanied by clicking.",
        "Hex coupling rattle on SC drive units — clunk during direction change at low speed.",
        "FC5200 IC: timing chain rattle on cold start (GM 2.4L) — tensioner wear.",
      ],
      questions: [
        { q: "Is this an electric Crown with growling drive wheels?", yes: "Drive motor bearing — replace before motor damage, common SC wear", no: "Other drivetrain noise" },
        { q: "Whine during lift only on RR?", yes: "Lift pump motor bearing — wear amplified under load", no: "Mast-side noise" },
        { q: "Clicking accompanying jerky lift on RR?", yes: "Mast load wheel flat spots — inspect and replace wheels", no: "Different mast fault" },
        { q: "FC5200 IC with cold-start rattle that goes away warm?", yes: "Timing chain tensioner — GM 2.4L wear, same as other IC trucks", no: "Not timing chain" },
      ],
    },
  },

  hangcha: {
    no_start: {
      tendencies: [
        "LPG lockoff solenoid failure on CPYD — clicks but no fuel, especially after weeks of sitting.",
        "Xinchai engine ignition coil weakness on CPCD — hard start when hot, fine cold.",
        "Seat switch wiring chafe on CPCD25/30 — wire passes a sharp edge under the seat pan on early units.",
        "ECU connector corrosion on XF-series — newer line but rear-mounted ECU collects moisture.",
        "Main battery isolator switch internal corrosion on CPD — appears dead, full battery voltage at terminals.",
      ],
      questions: [
        { q: "Does the dash light up with key on?", yes: "Crank or fuel side", no: "Isolator switch, key barrel, or main fuse — common Hangcha CPD lockout" },
        { q: "Is this an LPG truck that sat for a week+?", yes: "Lockoff solenoid stuck closed — Hangcha CPYD known after-storage failure", no: "Different no-start path" },
        { q: "Does it crank but only refuse to start hot?", yes: "Coil weakness on Xinchai engines — Hangcha CPCD common", no: "Cold-start path — fuel, glow plugs, or compression" },
        { q: "Is the OPS / seat light on with operator seated?", yes: "Seat switch wire chafe — CPCD25/30 specific routing flaw", no: "Not interlock" },
      ],
    },
    steering: {
      tendencies: [
        "BZZ orbital wear on CPCD — Hangcha uses a generic Chinese-sourced BZZ that wears faster than Toyota/Yale equivalents.",
        "Steering cylinder rod pitting on CPYD — chrome layer thin on OEM cylinders.",
        "Tie rod ball joint play on CPCD25/30 — manifests as wander before clunk.",
        "Hydraulic priority valve sticking under cold start — XF-series specifically.",
        "Steering column lower bushing wear on high-hour CPD — notchy feel at center.",
      ],
      questions: [
        { q: "Is the steering wheel free-wheeling without tire response?", yes: "BZZ orbital internal wear — Hangcha known faster wear than Toyota", no: "Hydraulic supply or mechanical" },
        { q: "Visible oil on the steer cylinder rod?", yes: "Cylinder rod pitting and seal damage — CPYD common", no: "External cylinder fine — internal issue" },
        { q: "Does steering wander on a straight line?", yes: "Tie rod ball joints — CPCD25/30 wear, easy to miss", no: "Different mechanical or hydraulic" },
        { q: "XF-series with heavy steering only on cold morning starts?", yes: "Priority valve sticking cold — XF-series spool issue, warms out", no: "Persistent issue — not cold-specific" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Tilt cylinder seal failure on CPCD30/35 — mast creep, similar to Heli but earlier hour failure.",
        "Lift cylinder packing wear on CPYD25/30 — slow drift under load.",
        "Chain anchor pin retainer clip loss on CPCD — chain anchor migrates, fork height shifts.",
        "Hydraulic control valve detent ball wear — lever drifts toward neutral.",
        "Mast roller wear on XF-series — Hangcha factory grease intervals optimistic for dirty environments.",
      ],
      questions: [
        { q: "Does the load drift down slowly when held?", yes: "Lift cylinder packing — CPYD wear, often around 4000 hours", no: "Mast travel or noise issue" },
        { q: "Mast tilts forward under load on its own?", yes: "Tilt cylinder seals — CPCD30/35 common wear point", no: "Tilt valve centering check" },
        { q: "Forks at different heights after weeks?", yes: "Chain anchor pin retainer missing — CPCD inspection item", no: "Chain stretch or other wear" },
        { q: "Mast jerky or rough mid-travel?", yes: "Roller condition — XF-series benefits from doubled grease frequency", no: "Hydraulic flow or valve" },
      ],
    },
    brakes: {
      tendencies: [
        "Master cylinder bypass on CPCD — pedal slowly sinks, common Hangcha-sourced MC wear.",
        "Parking brake cable seizing on CPYD operating in damp environments.",
        "Wheel cylinder leak on older CPCD — external brake fluid at rear wheels.",
        "Brake fluid contamination from moisture — Hangcha spec is sensitive, change interval often skipped.",
        "Brake shoe glaze on CPD electrics from light usage patterns — squealing without effective braking.",
      ],
      questions: [
        { q: "Pedal slowly sinks when held?", yes: "Master cylinder internal bypass — CPCD common, similar to Heli", no: "External or shoe issue" },
        { q: "Parking brake won't release cleanly?", yes: "Cable seized — CPYD in damp environments, lubricate cable run", no: "Mechanism or shoe issue" },
        { q: "Fluid weeping at rear wheels?", yes: "Wheel cylinder failure — older CPCD seal kits readily available", no: "System-wide hydraulic" },
        { q: "Brakes squeal but don't grab well?", yes: "Shoe glaze — CPD electric light-duty pattern, deglaze or replace", no: "Other contamination or wear" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on CPCD30/35 — harsh engagement when warm.",
        "Directional solenoid intermittent on CPCD — coil resistance drift in heat.",
        "Torque converter input bearing whine on high-hour CPCD30 — preceeds harder failure.",
        "Inching valve cable adjustment drift on CPYD — poor creep modulation.",
        "Transmission oil cooler restriction on CPCD operating in dusty environments.",
      ],
      questions: [
        { q: "Engagement harsh especially when warm?", yes: "Clutch pack wear on CPCD30/35 — common Hangcha powershift issue", no: "Cold-only engagement issue is different" },
        { q: "F or R intermittently lost?", yes: "Directional solenoid coil drift — test cold vs warm resistance", no: "Mechanical or pressure side" },
        { q: "Whine from trans area worsening?", yes: "Torque converter input bearing — CPCD30 wear, schedule rebuild", no: "Pump or other source" },
        { q: "Trans overheats during sustained work?", yes: "Cooler restriction — clean Hangcha cooler core, runs smaller than Japanese", no: "Internal — pressure test" },
      ],
    },
    electrical: {
      tendencies: [
        "ECU rear-mount water intrusion on XF-series — Hangcha rear ECU placement collects rain/wash spray.",
        "Wiring harness UV degradation on CPCD operating outdoors — insulation cracks at 5+ years.",
        "Instrument cluster backlight failure on CPCD — common dropout, hard to read at night.",
        "Fuse box corrosion on CPD electrics — sealing improved in XF-series but older units affected.",
        "Battery charge connector wear on CPD — high-current connector pins overheat from light arcing.",
      ],
      questions: [
        { q: "Is this an XF-series with intermittent ECU codes?", yes: "Rear ECU water intrusion — Hangcha XF design weakness, reseal connector", no: "Different fault location" },
        { q: "Wire insulation cracking on outdoor-stored truck?", yes: "UV degradation — common Hangcha CPCD after 5 years sun exposure", no: "Different harness issue" },
        { q: "Dash readable in daylight but not at night?", yes: "Cluster backlight failure — Hangcha CPCD common, full cluster swap usually", no: "Not backlight" },
        { q: "Battery charge connector hot to the touch?", yes: "Connector pin arcing — CPD known wear, replace before damage spreads", no: "Other electrical heat source" },
      ],
    },
    overheating: {
      tendencies: [
        "Small radiator core on CPCD — Hangcha cores even smaller than Heli, clog very fast.",
        "Thermostat stuck closed on Xinchai engines — rapid overheat under any load.",
        "Water pump bearing wear on Xinchai 490 — squeal precedes overheat by weeks.",
        "Coolant overflow tank cap weak — releases too early, system loses coolant on heat cycles.",
        "Fan belt slip on CPCD diesels — belt quality variable on OEM replacement.",
      ],
      questions: [
        { q: "How fast does overheat happen?", yes: "Within minutes = thermostat stuck closed or severe core clog", no: "Gradual — flow or capacity" },
        { q: "Radiator core visibly packed with debris?", yes: "Clean core — Hangcha CPCD core extra small, frequent cleaning critical", no: "Internal flow issue" },
        { q: "Squeal from water pump area?", yes: "Water pump bearing — Xinchai 490, replace before failure cascades", no: "Other component" },
        { q: "Coolant level dropping slowly with no leak visible?", yes: "Overflow cap releasing pressure too early — replace cap first, cheap fix", no: "Internal leak — head gasket check" },
      ],
    },
    noise: {
      tendencies: [
        "Xinchai injector tick on CPCD — wears with hours, becomes pronounced.",
        "Hydraulic pump whine on cold morning starts — aerated oil common in cold storage.",
        "Drive axle bearing growl on CPCD30 — worsens under turning load.",
        "Mast chain slap on CPCD — Hangcha chain tension spec is on the loose side; verify.",
        "Exhaust flex pipe rattle on CPYD — fatigue cracks at the flex section.",
      ],
      questions: [
        { q: "Ticking that follows engine RPM?", yes: "Injector wear (Xinchai) or exhaust manifold gasket", no: "Not engine-driven" },
        { q: "Whine during lift, especially cold?", yes: "Hydraulic pump cavitation cold — Hangcha cold weather behavior, warms out", no: "Persistent whine — bearing or pump failure" },
        { q: "Growl under turning load?", yes: "Drive axle bearing — CPCD30 wear point", no: "Other drivetrain source" },
        { q: "Mast chain rattle at rest height?", yes: "Chain tension on the loose side per Hangcha spec — retension by gauge", no: "Mast wheel or guide noise" },
      ],
    },
  },

  doosan: {
    no_start: {
      tendencies: [
        "G424F LPG engine: lockoff solenoid clicks but doesn't open after long sit — Doosan GC25E/GC30E common.",
        "D24NAP diesel: fuel pump priming weakness — long crank to start, fine once running.",
        "Operator presence relay failure on B-series electrics — clicks audibly but truck won't power up.",
        "Curtis controller fault code stored — BLE/console required to read on B16X/B20X/B25X.",
        "Key switch barrel internal contact wear on older D-series — turn-and-wiggle to start.",
      ],
      questions: [
        { q: "Does the dash power up with key on?", yes: "Crank or fuel side — Doosan diagnostics", no: "Key switch, OPS relay (B-series), or main power" },
        { q: "Is this an LPG GC25E/30E that worked yesterday?", yes: "Lockoff solenoid — G424F engine common after-sit failure", no: "Different fault path" },
        { q: "D-series diesel with long crank to start?", yes: "Fuel pump priming weak — D24NAP wear, prime and test", no: "Spark, glow plugs, or compression" },
        { q: "B-series electric — fault code on display?", yes: "Curtis controller code lookup required — keep a code list handy", no: "No code — different path" },
      ],
    },
    steering: {
      tendencies: [
        "Hydraulic orbital wear on GC25E — Korean OEM holds up well but eventual seal weep.",
        "Steer cylinder rod seal on D30S — visible oil at rod after high hours.",
        "Tie rod end wear on B-series electrics — clunking at direction reversal.",
        "Priority valve relief setting drift on D35C — heavy steering under simultaneous lift.",
        "Steer encoder fault on BR16JW reach truck — Curtis electric steering, codes stored.",
      ],
      questions: [
        { q: "Spongy or delayed steering feel?", yes: "Orbital wear or air in steering circuit — GC-series common high-hour", no: "Mechanical wear" },
        { q: "Oil at steer cylinder rod?", yes: "Rod seal replacement — D30S typical wear", no: "Internal hydraulic" },
        { q: "Clunk at direction change?", yes: "Tie rod end wear — B-series check first, easy to verify", no: "Hydraulic side" },
        { q: "Reach truck with electric steering fault?", yes: "Steer encoder — BR16JW Curtis system, pull code", no: "Different reach truck steering issue" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder seal wear on D-series — fork drift under load, common around 5000 hours.",
        "Mast carriage hose chafe on GC30E — Doosan routing tight against mast channels.",
        "Tilt cylinder pin and bushing wear on D35C — perceived drift from mechanical play.",
        "Reach cylinder hose burst risk on BR16JW — pressure pulses at full retract.",
        "Mast roller wear on B25X electric — service interval often missed on warehouse trucks.",
      ],
      questions: [
        { q: "Load drifts down under hold?", yes: "Lift cylinder seal wear — D-series typical around 5000hr", no: "Mast movement or noise issue" },
        { q: "Visible hose wear at mast carriage?", yes: "Chafe through risk — GC30E routing weakness, re-route or replace", no: "Internal hydraulic" },
        { q: "Tilt cylinder shows play at pin?", yes: "Pin/bushing wear — D35C common, replace before more wear cascades", no: "Seal wear" },
        { q: "Reach cylinder hose visibly worn?", yes: "Pressure-pulse fatigue — BR16JW known, replace before burst", no: "Other reach truck hydraulic" },
      ],
    },
    brakes: {
      tendencies: [
        "Master cylinder failure on GC25E — internal bypass, slow pedal fade.",
        "Wet disc brake wear on D-series powershift trucks — requires trans removal.",
        "Parking brake cable stretch on D30S — adjuster runs out of travel.",
        "Brake booster vacuum line crack on GC30E — hard pedal, poor assist.",
        "B-series electrics: regen brake calibration drift — feels weak under controller.",
      ],
      questions: [
        { q: "Pedal slowly fades to floor?", yes: "Master cylinder bypass — GC25E common Doosan failure", no: "Adjustment, lining, or external issue" },
        { q: "Is this a D-series with internal wet brakes?", yes: "Wet disc wear — trans removal required, Doosan service item", no: "External service brake" },
        { q: "Parking brake adjuster maxed out?", yes: "Cable stretch — D30S common, replace cable", no: "Mechanism or shoe wear" },
        { q: "GC30E with hard pedal and poor stopping?", yes: "Booster vacuum line crack — Doosan-specific brittle line", no: "Different brake fault" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on D30S — harsh engagement when warm.",
        "Inching valve cable on GC25E — adjustment drifts with use.",
        "Directional solenoid coil failure on D-series — intermittent F or R loss.",
        "Trans cooler restriction on D35C operating heavy duty cycles.",
        "B-series drive motor brush wear (older models) or bearing growl (AC drive) on B25X.",
      ],
      questions: [
        { q: "Hard engagement when trans is warm?", yes: "Clutch pack wear — D30S powershift common", no: "Cold engagement issue is different" },
        { q: "F or R intermittently lost?", yes: "Directional solenoid coil — Doosan D-series wear", no: "Mechanical clutch issue" },
        { q: "Trans overheats during heavy use?", yes: "Cooler restriction — D35C cleaning often needed", no: "Internal wear — pressure test" },
        { q: "B-series electric with drive motor noise?", yes: "Brush wear (older) or bearing growl (AC) — B25X high-hour wear", no: "Other drive issue" },
      ],
    },
    electrical: {
      tendencies: [
        "Curtis controller fault codes on B-series — common, well-documented, scanner-friendly.",
        "Instrument cluster relay sticking on GC25E — random dash dropouts.",
        "Harness chafe behind dash on D30S — Doosan routing pinches at console mount.",
        "Battery state-of-charge meter calibration on B-series — false low warnings.",
        "Throttle position sensor wear on G424F engine (GC25E/GC30E) — surging and dead spots.",
      ],
      questions: [
        { q: "B-series electric with Curtis code displayed?", yes: "Code lookup — Curtis docs are accurate, follow procedure", no: "No code — different path" },
        { q: "Random dash power dropouts?", yes: "Cluster relay sticking — GC25E known, replace relay", no: "Different power issue" },
        { q: "Issues happen when wheel turned full lock?", yes: "Harness chafe behind dash — D30S console mount issue, inspect", no: "Different fault location" },
        { q: "G424F engine surging at part throttle?", yes: "Throttle position sensor wear — Doosan LPG common, replace TPS", no: "Different drivability issue" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator dust packing on D-series — Doosan core spacing tight, packs fast in dusty sites.",
        "G424F thermostat stuck closed — rapid overheat under any load.",
        "Water pump weep on D24NAP diesel — slow external loss at weep hole.",
        "Cooling fan clutch failure on D30S — fan spins but moves no air.",
        "B-series motor overheat under sustained heavy lift — duty cycle exceeded.",
      ],
      questions: [
        { q: "How fast does overheat happen?", yes: "Within minutes = thermostat stuck or severe blockage", no: "Gradual — flow or capacity" },
        { q: "Radiator clogged with dust/debris?", yes: "Clean core — D-series spacing makes this critical", no: "Internal flow issue" },
        { q: "Drip from water pump weep hole?", yes: "Pump seal failing — D24NAP, replace before catastrophic", no: "Other leak source" },
        { q: "Fan spinning but no air movement?", yes: "Fan clutch failure — D30S common, replace clutch", no: "Belt, motor, or other" },
      ],
    },
    noise: {
      tendencies: [
        "G424F timing chain rattle on cold start — tensioner wear after 6000hr.",
        "D-series transmission whine — input bearing wear precedes failure by months.",
        "Hydraulic pump cavitation on GC30E — aerated oil from low level common.",
        "Drive axle bearing growl on D30S — worsens under turning load.",
        "Exhaust manifold gasket leak on D24NAP — ticking that worsens with temperature.",
      ],
      questions: [
        { q: "Cold-start rattle that goes away warm?", yes: "Timing chain tensioner — G424F or D24NAP wear, common", no: "Not timing chain" },
        { q: "Whine from trans area, growing?", yes: "Trans input bearing — D-series typical wear", no: "Other source" },
        { q: "Whine on lift only?", yes: "Pump cavitation — check oil level first, easiest fix", no: "Engine accessory or other" },
        { q: "Ticking that gets louder with temp?", yes: "Exhaust manifold gasket — D24NAP common", no: "Internal engine noise" },
      ],
    },
  },

  clark: {
    no_start: {
      tendencies: [
        "Continental / GM 2.4L ignition module failure on older Clark — no spark condition.",
        "Carburetor float stuck on LPG C-series after sitting — flooded or starved.",
        "Neutral safety switch adjustment drift on powershift Clark — out of safe position.",
        "Battery cable corrosion at starter on legacy C25/C30 — voltage drop at cranking.",
        "Aging ignition harness on Clark — brittle insulation cracks, shorts to chassis.",
      ],
      questions: [
        { q: "Dash powers up with key?", yes: "Crank or fuel side", no: "Battery, key switch, or main wiring on legacy Clark" },
        { q: "Is this an LPG C-series that's been sitting?", yes: "Carburetor float — Clark LPG common after-sit issue", no: "Different fuel path" },
        { q: "Does it crank but not fire?", yes: "Ignition module on GM 2.4L or harness short — Clark legacy common", no: "Fuel delivery or compression" },
        { q: "Cranks slow even with good battery?", yes: "Cable corrosion at starter — Clark legacy wear, voltage drop test", no: "Starter motor wear" },
      ],
    },
    steering: {
      tendencies: [
        "Hydraulic orbital seal failure on C-series — oil weep under truck overnight.",
        "Steer axle king pin wear on legacy C25/C30 — clunk and slop, very common high-hour.",
        "Tie rod end play on GTX25 — wandering before clunk.",
        "Steering column bushing wear on cushion-tire CGC25 — column moves in mount.",
        "Power steering belt slip on GTX25 — heavy steering under engine load.",
      ],
      questions: [
        { q: "Oil pooling under front of truck?", yes: "Orbital seal failure — C-series legacy common", no: "Internal wear or no leak" },
        { q: "Clunk from steer axle on legacy C25/C30?", yes: "King pin wear — extremely common on high-hour Clarks", no: "Other source" },
        { q: "Wandering on straight line?", yes: "Tie rod ends or king pins — GTX25 also affected", no: "Hydraulic side" },
        { q: "Heavy steering only at high engine load?", yes: "Power steering belt slip — GTX25, retension belt", no: "Hydraulic supply" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder packing wear on C-series — drift under load, common over 8000 hours.",
        "Tilt cylinder seal failure on CGC25 — mast tilt creep under load.",
        "Mast chain stretch on legacy C25/C30 — uneven fork height, replace by chain wear gauge.",
        "Hydraulic control valve detent wear on GTX25 — levers won't hold position.",
        "Mast roller flat spots on CGP25 LPG — jerky lift travel.",
      ],
      questions: [
        { q: "Load drifts down under hold?", yes: "Lift cylinder packing — Clark C-series legacy wear, very common", no: "Different mast fault" },
        { q: "Mast tilts forward under load?", yes: "Tilt cylinder seals — CGC25 common Clark wear", no: "Tilt valve check" },
        { q: "Forks at uneven heights?", yes: "Chain stretch — measure with chain gauge, replace if over spec", no: "Anchor or wear" },
        { q: "Control levers drift back from position?", yes: "Detent wear — GTX25 known, rebuild or replace valve", no: "Spring or linkage" },
      ],
    },
    brakes: {
      tendencies: [
        "Brake master cylinder bypass on C-series — pedal slowly sinks, Clark legacy issue.",
        "Brake drum scoring on CGC25/CGP25 — heavy use without inspection.",
        "Parking brake cable corrosion on outdoor-used Clark — seized in adjuster.",
        "Wheel cylinder seal failure on legacy C25/C30 — external brake fluid at wheel.",
        "Brake shoe contamination on CGP25 LPG — oil leak from rear seal soaks shoes.",
      ],
      questions: [
        { q: "Pedal fades to floor when held?", yes: "Master cylinder bypass — C-series classic Clark wear", no: "Different brake issue" },
        { q: "Squealing and reduced braking on CGC25?", yes: "Drum scoring — measure drums, replace if past wear limit", no: "Lining or fluid" },
        { q: "Parking brake won't release after sitting?", yes: "Cable seized — Clark outdoor unit common, lubricate cable", no: "Mechanism issue" },
        { q: "Pull to one side under braking?", yes: "Contaminated shoe (oil) or wheel cylinder sticking — CGP25 watch rear seal", no: "System-wide issue" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on C-series — slipping under load after years.",
        "Inching valve linkage adjustment drift on legacy Clark — poor creep.",
        "Trans cooler line corrosion on CGC25 — leak at fittings.",
        "Directional control valve internal wear on GTX25 — slow engagement.",
        "Drive axle pinion seal failure on legacy C25/C30 — gear oil loss at drive flange.",
      ],
      questions: [
        { q: "Slipping under load, especially on grade?", yes: "Powershift clutch pack — C-series wear, typical Clark legacy", no: "Other transmission issue" },
        { q: "Poor inching pedal modulation?", yes: "Inching linkage adjustment — Clark legacy, recalibrate per spec", no: "Internal trans" },
        { q: "Fluid leak at trans cooler lines?", yes: "Line corrosion at fittings — CGC25 common, replace lines", no: "Other fluid source" },
        { q: "Gear oil weep at drive flange?", yes: "Pinion seal — legacy C25/C30 wear, replace seal", no: "Differential or other" },
      ],
    },
    electrical: {
      tendencies: [
        "Aging wiring harness on legacy C-series — brittle insulation, multiple shorts possible.",
        "Instrument cluster failure on CGC25 — gauges read incorrectly or not at all.",
        "Fuse box corrosion on outdoor-used Clark — intermittent multi-circuit faults.",
        "Horn switch wear in steering column on C-series — fails or stays on.",
        "ECX electric series: Curtis controller faults — code lookup required.",
      ],
      questions: [
        { q: "Multiple intermittent electrical faults at once?", yes: "Aging harness short or fuse box corrosion — legacy Clark, full inspection", no: "Single circuit issue" },
        { q: "Instrument gauges reading wrong or dead?", yes: "Cluster failure — CGC25 known, full cluster replacement common", no: "Sender issue" },
        { q: "Horn stuck on or won't sound?", yes: "Steering column horn switch — C-series wear", no: "Wiring or relay" },
        { q: "ECX electric with controller code?", yes: "Curtis controller code lookup — same playbook as Doosan B-series", no: "Other electrical" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator fin clogging on C-series — older Clark cores accumulate years of warehouse dust.",
        "Thermostat stuck closed on GM 2.4L — rapid overheat, common Clark IC wear.",
        "Water pump weep on legacy Continental engines (older C-series) — slow external loss.",
        "Cylinder head crack on overheated GM 2.4L — pushes coolant into oil or exhaust.",
        "Cooling fan motor failure on ECX electrics — controller overheat warning, derate.",
      ],
      questions: [
        { q: "Coolant being pushed out or appearing in oil?", yes: "Head gasket or cracked head — GM 2.4L common after overheat event", no: "External or flow issue" },
        { q: "Radiator visibly packed with debris?", yes: "Clean core — Clark legacy units accumulate over years", no: "Internal flow issue" },
        { q: "Drip from water pump?", yes: "Pump seal failing — Continental engines on older C-series", no: "Other leak source" },
        { q: "ECX with controller temp warning?", yes: "Cooling fan motor failure — controller derates, check fan", no: "Battery or duty cycle" },
      ],
    },
    noise: {
      tendencies: [
        "GM 2.4L timing chain rattle on cold start — tensioner wear, common Clark IC.",
        "Powershift trans whine on C-series — input bearing wear, audible months before failure.",
        "Drive axle bearing growl on legacy C25/C30 — high-hour wear, typical Clark.",
        "Hydraulic pump cavitation on cold morning — aerated oil from low level.",
        "Exhaust manifold leak on GM 2.4L — studs corrode, ticking that worsens with temp.",
      ],
      questions: [
        { q: "Cold-start rattle that goes away warm?", yes: "Timing chain tensioner — GM 2.4L wear", no: "Not timing chain" },
        { q: "Whine from trans area, getting louder?", yes: "Input bearing wear — C-series legacy, schedule trans service", no: "Pump or other" },
        { q: "Growl under turning load?", yes: "Drive axle bearing — legacy C25/C30 common high-hour", no: "Other drivetrain" },
        { q: "Ticking that worsens with engine temperature?", yes: "Exhaust manifold leak — GM 2.4L stud corrosion, common Clark", no: "Internal engine" },
      ],
    },
  },

  cat: {
    no_start: {
      tendencies: [
        "Seat switch wiring on DP/GP-N series — MCFA platform-shared issue with Mitsubishi FGC-N, connector corrosion.",
        "GM 4.3L LPG (some 2EC/GP models): ignition module heat-soak failure — won't restart when hot.",
        "Mitsubishi S4S diesel on DP30N: fuel solenoid stuck after long sit — needs manual prime.",
        "2EC electric: BDI lockout below 20% — refuses operation until full charge cycle complete.",
        "Key barrel internal wear on older DP-N — turn and jiggle behavior.",
      ],
      questions: [
        { q: "Dash powers up with key?", yes: "Crank or fuel side", no: "Key barrel, main power, or BDI lockout on 2EC" },
        { q: "GM 4.3L LPG hot start refusal?", yes: "Ignition module heat soak — let cool, hot restart fails on CAT LP", no: "Different LP fault" },
        { q: "S4S diesel after long sit — won't start?", yes: "Fuel solenoid hung up — manual prime the system", no: "Glow plug or compression side" },
        { q: "Is this a 2EC electric with full battery refusing operation?", yes: "BDI lockout state — full charge cycle and reset, MCFA quirk", no: "Different electric fault" },
      ],
    },
    steering: {
      tendencies: [
        "Hydraulic orbital wear on DP/GP-N — same BZZ-style unit as Mitsubishi, similar wear curve.",
        "Steer cylinder rod seal on DP30N — visible weep at rod, common high-hour.",
        "Tie rod end play on GP25N — wandering before clunk presents.",
        "Priority valve sticking on cold mornings — 2EC electric, valve spool issue.",
        "Steer encoder fault on NR16N2 reach — code stored in controller.",
      ],
      questions: [
        { q: "Spongy or delayed steering feel?", yes: "Orbital wear — DP/GP-N shares Mitsubishi wear pattern", no: "Mechanical or supply side" },
        { q: "Visible oil at steer cylinder rod?", yes: "Rod seal — DP30N common after high hours", no: "Internal hydraulic" },
        { q: "Truck wanders on a straight line?", yes: "Tie rod ends — GP25N inspection point", no: "Hydraulic or alignment" },
        { q: "NR16N2 reach with steering code?", yes: "Steer encoder fault — pull code with MCFA scanner", no: "Hydraulic side on reach" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder seal wear on DP30N — fork drift under load around 6000 hours.",
        "Tilt cylinder seal failure on GP25N — mast tilt creep, common MCFA platform wear.",
        "Mast chain stretch on DP25N — uneven fork height after years of heavy duty.",
        "Hydraulic control valve spool sticking on 2EC cold starts — warms out, intermittent.",
        "Sideshift cylinder leak on integrated carriage models — common service item.",
      ],
      questions: [
        { q: "Load drifts down when held?", yes: "Lift cylinder seal — DP30N typical wear after 6k hours", no: "Different mast issue" },
        { q: "Mast tilts forward on its own under load?", yes: "Tilt cylinder seals — GP25N MCFA-shared wear", no: "Valve centering check" },
        { q: "Forks uneven after long use?", yes: "Chain stretch — measure and replace by gauge", no: "Anchor or pin issue" },
        { q: "Sideshift drifting or leaking?", yes: "Sideshift cylinder seal kit — common CAT service", no: "Main mast circuit" },
      ],
    },
    brakes: {
      tendencies: [
        "Master cylinder bypass on DP/GP-N — pedal slowly fades, shared MCFA platform issue.",
        "Wet disc brake wear inside trans on powershift CAT — requires trans pull.",
        "Parking brake cable stretch on DP30N — adjuster runs out of travel.",
        "Brake booster vacuum line crack on GP25N LP — hard pedal.",
        "2EC electric: regen brake calibration drift — feels weak.",
      ],
      questions: [
        { q: "Pedal fades to floor when held?", yes: "Master cylinder internal bypass — DP/GP-N common", no: "External or shoe issue" },
        { q: "Powershift CAT with weak service brakes?", yes: "Wet disc wear — trans removal required", no: "External system" },
        { q: "Parking brake adjuster maxed?", yes: "Cable stretch — DP30N replace", no: "Mechanism issue" },
        { q: "2EC with weak braking under controller?", yes: "Regen calibration drift — recalibration procedure", no: "Different brake fault" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on DP30N — harsh engagement when warm.",
        "Inching valve adjustment drift on GP25N — poor creep control.",
        "Trans cooler restriction on DP-N — same as Mitsubishi FGC, MCFA platform.",
        "Directional solenoid coil failure on DP/GP-N — intermittent F or R.",
        "2EC electric: drive motor bearing growl after high hours.",
      ],
      questions: [
        { q: "Hard engagement when warm?", yes: "Clutch pack wear — DP30N powershift, common CAT", no: "Cold engagement is different" },
        { q: "F or R intermittently lost?", yes: "Directional solenoid coil — DP/GP-N coil drift", no: "Mechanical issue" },
        { q: "Trans overheats during sustained work?", yes: "Cooler restriction — DP-N shared issue with Mitsubishi", no: "Internal — pressure test" },
        { q: "2EC drive wheels making growling noise?", yes: "Drive motor bearing — replace before failure cascade", no: "Other drive source" },
      ],
    },
    electrical: {
      tendencies: [
        "ECU connector corrosion on DP/GP-N — shared with Mitsubishi FGC-N, MCFA platform.",
        "Instrument cluster failure on older DP25N — dead segments.",
        "Harness chafe near mast pivot on GP30N — shared routing weakness.",
        "2EC controller error codes — MCFA scanner required.",
        "Throttle position sensor on GM 4.3L LPG — surging and dead spots.",
      ],
      questions: [
        { q: "Intermittent codes that come and go?", yes: "ECU connector corrosion — DP/GP-N known, clean and reseal", no: "Consistent fault" },
        { q: "Dash backlight failed or segments missing?", yes: "Cluster failure — older DP25N common, replace cluster", no: "Sender issue" },
        { q: "Issues appearing when mast is raised?", yes: "Mast pivot harness chafe — GP30N MCFA routing", no: "Different fault location" },
        { q: "GM 4.3L LPG engine surging?", yes: "TPS wear — replace, common GM 4.3L fault", no: "Different drivability" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator clogging on DP-N — shared core sizing with Mitsubishi, accumulates dust.",
        "Mitsubishi S4S thermostat stuck closed on DP30N — rapid overheat.",
        "Water pump weep on S4S diesel — drip from weep hole.",
        "Cooling fan clutch failure on GP25N — fan spins but moves no air.",
        "2EC electric: traction motor overheat under heavy duty cycle.",
      ],
      questions: [
        { q: "How fast does it overheat?", yes: "Within minutes = thermostat stuck or severe blockage", no: "Gradual — flow or capacity" },
        { q: "Radiator visibly clogged?", yes: "Clean core — MCFA cores accumulate over time", no: "Internal flow" },
        { q: "Drip from water pump weep hole?", yes: "Pump seal failing — S4S common, replace pump", no: "Other coolant leak" },
        { q: "2EC under heavy duty cycle, motor overheat?", yes: "Application exceeds duty rating — review usage pattern", no: "Component failure" },
      ],
    },
    noise: {
      tendencies: [
        "S4S timing chain tensioner wear on DP30N — cold-start rattle.",
        "Drive axle bearing growl on DP25N — high-hour wear.",
        "Hydraulic pump cavitation on cold starts — common CAT IC trucks.",
        "Mast chain slap on DP-N — tension spec critical, MCFA-shared.",
        "Exhaust manifold gasket leak on S4S — ticking that worsens with temp.",
      ],
      questions: [
        { q: "Cold-start rattle that goes away warm?", yes: "Timing chain tensioner — S4S diesel common", no: "Not timing chain" },
        { q: "Growl under turning load?", yes: "Drive axle bearing — DP25N high-hour wear", no: "Other drivetrain" },
        { q: "Whine during cold-start lift?", yes: "Pump cavitation — aerated oil, check level first", no: "Bearing or pump failure" },
        { q: "Ticking that worsens with engine heat?", yes: "Exhaust manifold gasket — S4S common, replace gasket", no: "Internal engine" },
      ],
    },
  },

  raymond: {
    no_start: {
      tendencies: [
        "Drive motor brush wear on legacy 4250/4400 reach — won't move, looks like 'won't start'.",
        "Battery connector pin arcing on 5500/7400 — high resistance, controller refuses operation.",
        "Operator presence sensor failure on 8210 walkie pallet — won't power up.",
        "ACR controller fault code on newer 4400 — Raymond proprietary scanner required.",
        "Key switch / OPS pendant wear on 9700 order picker — intermittent power.",
      ],
      questions: [
        { q: "Is this a reach truck (4250/4400) that won't drive?", yes: "Drive motor brushes (DC) or bearings (AC) — Raymond reach common", no: "Different 'won't move' fault" },
        { q: "Battery connector hot or pitted?", yes: "Connector pin arcing — high resistance, 5500/7400 known", no: "Connector good — different power issue" },
        { q: "Walkie pallet (8210) with no power-up?", yes: "Operator presence sensor or tiller switch — Raymond walkie wear", no: "Different fault" },
        { q: "Newer 4400 reach with display fault code?", yes: "ACR controller code lookup — Raymond ACT/scanner required", no: "No code path" },
      ],
    },
    steering: {
      tendencies: [
        "Steer encoder on 7720 swing-reach — proprietary swing system, requires Raymond scanner.",
        "Tie rod end wear on 5400/5500 sit-down — clunking and wandering.",
        "Steer motor brush wear on legacy DC-drive Raymond — heavy steering feel.",
        "Hex coupling wear between steer motor and drive on newer AC Raymond reach.",
        "Power steering hydraulic seal weep on 7400 stand-up.",
      ],
      questions: [
        { q: "Is this a 7720 swing-reach with steering fault?", yes: "Swing system encoder — Raymond proprietary, scanner needed", no: "Standard steering path" },
        { q: "Heavy steering on legacy Raymond DC?", yes: "Steer motor brush wear — replace brushes", no: "Hydraulic side" },
        { q: "Clunk at steer wheel on direction change?", yes: "Hex coupling or tie rod end — depends on model", no: "Internal issue" },
        { q: "Oil weep at 7400 steer cylinder area?", yes: "Power steering hydraulic seal — Raymond stand-up common", no: "Other source" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift chain stretch on 4250 reach — fork tip-down, replace by Raymond chain gauge spec.",
        "Mast scanner / load wheel sensor on 4400 — locks out at certain heights, code stored.",
        "Free-lift cylinder seal failure on 4250/4400 — inner stage drops under load.",
        "Hydraulic hose chafe at mast carriage on reach trucks — burst risk under high lift.",
        "Lift pump motor brush wear on legacy DC Raymond — slow lift, eventually fails.",
      ],
      questions: [
        { q: "Reach truck (4250/4400) with forks tipping down?", yes: "Lift chain stretch — measure with Raymond chain gauge", no: "Different mast issue" },
        { q: "Truck stops lifting at certain height?", yes: "Mast scanner/load sensor — known Raymond fault location", no: "Hydraulic flow or pressure" },
        { q: "Inner stage of reach drops slowly?", yes: "Free-lift cylinder seal — 4250/4400 wear pattern", no: "Main lift or valve" },
        { q: "Legacy Raymond with slow lift speed?", yes: "Lift pump motor brushes worn — DC drive issue", no: "Hydraulic flow or pump" },
      ],
    },
    brakes: {
      tendencies: [
        "Regen brake calibration drift on AC-drive Raymond — weak braking feel.",
        "Parking brake disc wear on 4400 reach — won't hold on grade with load.",
        "Service brake by-wire sensor on 5500 sit-down — pedal works but no response.",
        "Brake pedal return spring on 7400 stand-up — pedal sticks down.",
        "Walkie pallet (8210) plug-brake contactor wear — weak plug stopping.",
      ],
      questions: [
        { q: "AC-drive Raymond with weak braking feel?", yes: "Regen calibration drift — Raymond recalibration procedure", no: "Mechanical or hydraulic" },
        { q: "Reach (4400) not holding on incline with load?", yes: "Parking brake friction disc — wear after high hours", no: "Different parking brake fault" },
        { q: "Brake pedal feels normal but no slowing?", yes: "By-wire sensor — 5500 safety-critical fault", no: "Mechanical or hydraulic" },
        { q: "Walkie pallet weak plug brake?", yes: "Plug-brake contactor wear — 8210 known service item", no: "Different brake system" },
      ],
    },
    transmission: {
      tendencies: [
        "Drive motor brush wear on legacy DC Raymond — slipping or no drive.",
        "AC drive bearing wear on newer 4400 — whine progressing to growl.",
        "Hex coupling between drive motor and gearbox — clunk on direction change.",
        "Gear case oil leak at output seal on 5500 — pink/red oil under wheels.",
        "Drive traction control parameter drift in ACR — jerky or laggy starts.",
      ],
      questions: [
        { q: "Legacy DC Raymond with slipping or no drive?", yes: "Drive motor brushes — replace before commutator damage", no: "Different drive fault" },
        { q: "Whining from drive wheels, getting louder?", yes: "AC drive motor bearing — 4400 wear pattern", no: "Other source" },
        { q: "Clunk on F/R direction change?", yes: "Hex coupling spline wear — Raymond drive system", no: "Other drivetrain" },
        { q: "Pink fluid under truck near drive wheels?", yes: "Gear case output seal leak — 5500 known service item", no: "Other leak source" },
      ],
    },
    electrical: {
      tendencies: [
        "ACR controller fault codes on 4400/9700 — Raymond proprietary scanner standard.",
        "iWarehouse fleet module battery dead on networked trucks — easy fix often missed.",
        "Joystick / pendant sensor wear on 9700 order picker.",
        "Harness chafe at mast pivot on reach trucks — Raymond routing prone to this.",
        "Battery state-of-charge calibration drift on newer Raymond — false low warnings.",
      ],
      questions: [
        { q: "ACR controller code on display?", yes: "Raymond scanner code lookup — proprietary procedure", no: "No code path" },
        { q: "iWarehouse fleet tracking dropping out?", yes: "iWarehouse module battery — easy fix, check first", no: "Network or controller" },
        { q: "Order picker with multi-axis joystick fault?", yes: "Joystick sensor wear — 9700 known wear, replace stick", no: "Different control fault" },
        { q: "Faults when mast is fully raised?", yes: "Harness chafe at mast pivot — common reach truck wear", no: "Different routing" },
      ],
    },
    overheating: {
      tendencies: [
        "Traction motor overheat on Raymond under heavy duty cycle — duty rating issue.",
        "Controller heat sink fan failure — drive cuts back power.",
        "Lift pump motor overheat on 4400 — repeated lift cycles trigger thermal cut.",
        "Battery overheat from wrong charging profile on newer Raymond.",
        "Drive motor commutator/brush heat on legacy DC — needs brush inspection.",
      ],
      questions: [
        { q: "Heavy-duty cycle and motor overheat warnings?", yes: "Duty rating exceeded — review application", no: "Single component failure" },
        { q: "Controller overtemp code?", yes: "Heat sink fan or airflow blockage — check fan first", no: "Different overheat" },
        { q: "Battery hot to touch after charging?", yes: "Charging profile mismatch — verify charger vs battery spec", no: "Not battery thermal" },
        { q: "Legacy DC drive smell or smoke under load?", yes: "Brush/commutator overheat — inspect immediately", no: "Other thermal source" },
      ],
    },
    noise: {
      tendencies: [
        "Drive motor bearing growl on AC Raymond reach — common after 8000hr.",
        "Lift pump motor whine on 4400 — bearing wear amplified by load.",
        "Mast wheel flat spots on 4250/4400 — clicking accompanying lift.",
        "Hex coupling rattle on Raymond drive — direction change clunk.",
        "Battery cell venting hiss on overcharged units — safety issue, investigate.",
      ],
      questions: [
        { q: "Drive wheels growling under load?", yes: "Drive motor bearing — AC Raymond after 8000hr", no: "Other drivetrain" },
        { q: "Whine during lift only?", yes: "Lift pump motor bearing — 4400 wear", no: "Mast-side noise" },
        { q: "Clicking accompanying jerky lift?", yes: "Mast wheel flat spots — replace wheels", no: "Different mast fault" },
        { q: "Hiss from battery compartment?", yes: "Battery cell venting — overcharge or cell failure, safety critical", no: "Other noise source" },
      ],
    },
  },

  linde: {
    no_start: {
      tendencies: [
        "Hydrostatic system cold-start: pump needs to build pressure before drive engages — Linde signature behavior.",
        "Joystick neutral switch fault — Linde safety circuit refuses crank if not in neutral.",
        "Deutz diesel on H25/H30: fuel solenoid stuck after long sit.",
        "VW industrial engine: glow plug failure causing no-start cold.",
        "LindeID operator card not recognized on newer trucks — fleet management lockout.",
      ],
      questions: [
        { q: "Engine cranks but no drive engagement?", yes: "Hydrostatic pressure issue — pump pressure check first, Linde-specific", no: "Different drive fault" },
        { q: "Won't crank at all?", yes: "Neutral switch or LindeID card — safety circuit refuses start", no: "Power supply issue" },
        { q: "Deutz diesel after long sit, hard start?", yes: "Fuel solenoid stuck — prime and test", no: "Glow plug or compression" },
        { q: "Cold-only hard start on VW engine?", yes: "Glow plug failure — common VW industrial wear", no: "Fuel or compression" },
      ],
    },
    steering: {
      tendencies: [
        "Hydrostatic steering integrated with main hydraulic — different from competitor orbital systems.",
        "Steer cylinder rod seal weep on H-series — visible oil at rod.",
        "Tie rod end wear on H30/H35 — wandering before clunk.",
        "Steer flow divider issue on E-series electric — heavy steering under simultaneous lift.",
        "LindePulse steer angle sensor on newer trucks — fault code stored.",
      ],
      questions: [
        { q: "Spongy steering or delayed response?", yes: "Hydrostatic system pressure or steer flow priority", no: "Mechanical wear" },
        { q: "Oil at steer cylinder rod?", yes: "Rod seal wear — H-series typical", no: "Internal hydraulic" },
        { q: "Wandering on straight line?", yes: "Tie rod ends — H30/H35 inspection point", no: "Hydraulic side" },
        { q: "Newer Linde with steering angle code?", yes: "Steer angle sensor — pull code with LindePulse diagnostic", no: "Mechanical or hydraulic" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder packing wear on H30/H35 — drift under load.",
        "Tilt cylinder seal failure on E25/E30 — mast creep under load.",
        "Mast chain stretch on H-series — uneven fork height after long use.",
        "Reach cylinder seal on R14/R16 reach — visible oil at extension.",
        "Hydraulic valve bank spool wear on newer Linde — lever drift.",
      ],
      questions: [
        { q: "Load drifts down when held?", yes: "Lift cylinder packing — H30/H35 high-hour wear", no: "Different mast issue" },
        { q: "Mast tilts forward under load?", yes: "Tilt cylinder seals — E25/E30 common wear", no: "Valve centering check" },
        { q: "Reach truck (R14/R16) with hydraulic leak at extension?", yes: "Reach cylinder seal — Linde reach service item", no: "Different reach hydraulic" },
        { q: "Lever drifting back to center?", yes: "Valve spool wear — newer Linde valve bank rebuild", no: "Spring or linkage" },
      ],
    },
    brakes: {
      tendencies: [
        "Hydrostatic deceleration controls service braking on Linde — relies on system pressure, different feel.",
        "Parking brake disc wear on H-series — won't hold on grade with load.",
        "Service brake by-wire sensor on newer E-series — pedal feedback issue.",
        "Brake pedal position sensor drift — hydrostatic decel modulation feels wrong.",
        "Trailer brake fitting leak on Linde tow tractors (rare in NA fleets).",
      ],
      questions: [
        { q: "Weak braking feel on hydrostatic Linde?", yes: "Brake pedal position sensor or system pressure — Linde-specific diagnosis", no: "Mechanical brake fault" },
        { q: "Not holding on grade with load?", yes: "Parking brake disc wear — H-series wear", no: "Different parking system" },
        { q: "Pedal works normally but truck barely slows?", yes: "By-wire sensor or hydrostatic decel calibration — Linde recalibration", no: "Mechanical fault" },
        { q: "Inconsistent braking modulation?", yes: "Pedal position sensor drift — recalibrate or replace", no: "Different brake system" },
      ],
    },
    transmission: {
      tendencies: [
        "Hydrostatic pump wear on H-series — Linde signature wear point, expensive replacement.",
        "Charge pump pressure loss — symptoms feel like trans slipping but hydrostatic.",
        "Drive motor bearing on hydrostatic — distinct from pump wear.",
        "E-series AC drive motor bearing wear — whine before growl.",
        "Hydrostatic relief valve setting drift — sluggish acceleration.",
      ],
      questions: [
        { q: "H-series with sluggish acceleration?", yes: "Hydrostatic pump wear or relief drift — pressure test first", no: "Different powertrain" },
        { q: "Slipping feel under load on hydrostatic?", yes: "Charge pump pressure low — check first, common Linde", no: "Drive motor issue" },
        { q: "E-series with drive whine progressing?", yes: "AC drive motor bearing — replace before failure", no: "Different drive fault" },
        { q: "Top speed reduced over time?", yes: "Hydrostatic pump wear — Linde major service item", no: "Pressure or control" },
      ],
    },
    electrical: {
      tendencies: [
        "LindePulse / LindeIntelligent diagnostic codes on newer trucks — proprietary scanner.",
        "Operator card reader fault on LindeID trucks — fleet lockout.",
        "Joystick electronics on H/E series — multi-axis fault from sensor wear.",
        "Harness chafe at mast pivot on reach trucks — Linde routing similar to other reaches.",
        "BlueSpot LED projector failure on newer Linde — pedestrian safety feature.",
      ],
      questions: [
        { q: "Newer Linde with diagnostic code?", yes: "LindePulse/Intelligent scanner code lookup", no: "No code path" },
        { q: "LindeID card not recognized?", yes: "Card reader fault — check reader and card, fleet management issue", no: "Different lockout" },
        { q: "Joystick acting up across multiple axes?", yes: "Joystick sensor wear — H/E common, replace stick", no: "Different control issue" },
        { q: "BlueSpot LED not projecting?", yes: "LED projector failure — safety feature, replace projector", no: "Different lighting fault" },
      ],
    },
    overheating: {
      tendencies: [
        "Hydraulic oil overheat on H-series under sustained heavy lift — cooler restriction.",
        "Deutz diesel cooling fan clutch — fan spins but moves no air.",
        "VW industrial engine thermostat stuck — rapid overheat.",
        "E-series motor overheat under sustained heavy duty.",
        "Controller heat sink fan on newer Linde — derate under heat.",
      ],
      questions: [
        { q: "Hydraulic oil overheat on H-series?", yes: "Hydraulic cooler restriction — clean cooler", no: "Engine cooling side" },
        { q: "How fast does engine overheat?", yes: "Within minutes = thermostat stuck or severe blockage", no: "Gradual flow issue" },
        { q: "Fan spinning but no airflow?", yes: "Fan clutch failure — Deutz common", no: "Belt or motor" },
        { q: "Controller heat warning on newer Linde?", yes: "Heat sink fan or airflow — check controller fan", no: "Battery or duty cycle" },
      ],
    },
    noise: {
      tendencies: [
        "Hydrostatic pump whine on H-series — distinct from gear-drive whine.",
        "Deutz diesel injector tick on H30/H35 — wears with hours.",
        "Drive motor bearing growl on E-series — high-hour wear.",
        "Mast wheel flat spots on R14/R16 reach — clicking with lift.",
        "Exhaust system rattle on VW industrial — common factory exhaust resonance.",
      ],
      questions: [
        { q: "Whine specifically from hydraulic pump area on H-series?", yes: "Hydrostatic pump wear — Linde major service item", no: "Different noise source" },
        { q: "Diesel injector tick that worsens with hours?", yes: "Injector wear — Deutz/VW industrial, common", no: "Other engine noise" },
        { q: "Drive growling on E-series?", yes: "Drive motor bearing — high-hour AC drive wear", no: "Other drivetrain" },
        { q: "Clicking accompanying lift on reach?", yes: "Mast wheel flat spots — R14/R16 wear, replace wheels", no: "Different mast fault" },
      ],
    },
  },

  jungheinrich: {
    no_start: {
      tendencies: [
        "Operator presence sensor on EFG-series — common failure, refuses power-up.",
        "BDI lockout on Li-ion equipped Jungheinrich — partial charge state lockouts.",
        "Curtis controller fault code on EFG/ETV — scanner required.",
        "Tiller switch wear on ESE/EJC pedestrian trucks — intermittent power.",
        "Battery connector wear on legacy Jungheinrich — arcing at pins.",
      ],
      questions: [
        { q: "EFG truck powers up with operator absent but not with operator?", yes: "Operator presence sensor — common Jungheinrich failure", no: "Different fault path" },
        { q: "Li-ion truck refusing operation despite charge?", yes: "BDI / BMS lockout state — Jungheinrich Li-ion firmware quirk, full charge reset", no: "Different lockout" },
        { q: "Controller code on display?", yes: "Curtis code lookup — Jungheinrich uses Curtis on most models", no: "No code path" },
        { q: "Pedestrian truck (ESE/EJC) won't power up?", yes: "Tiller switch wear — common pedestrian Jungheinrich", no: "Different power issue" },
      ],
    },
    steering: {
      tendencies: [
        "Electric steering motor encoder fault on EFG-series — code stored.",
        "Steer angle calibration drift on ETV reach — wheel/tire mismatch.",
        "Hex coupling wear between steer motor and drive on ETV.",
        "Tie rod end wear on EFG220 — clunking on direction change.",
        "Steer flow divider on multi-function trucks — heavy under simultaneous lift.",
      ],
      questions: [
        { q: "EFG with electric steering fault code?", yes: "Steer encoder or coupling — Curtis code lookup", no: "Mechanical or hydraulic side" },
        { q: "ETV reach with steering wheel/tire angle mismatch?", yes: "Steer angle calibration drift — recalibration procedure", no: "Mechanical wear" },
        { q: "Clunk at steer wheel on direction change?", yes: "Hex coupling or tie rod end — depends on model", no: "Internal issue" },
        { q: "Steering heavy under simultaneous lift?", yes: "Flow divider priority issue — common multi-function", no: "Pump or supply" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift chain stretch on ETV reach — fork tip-down condition.",
        "Free-lift cylinder seal failure on ETV214/216 — inner stage drops.",
        "Reach cylinder hose chafe at carriage — burst risk under high lift.",
        "Hydraulic seal degradation on EFG — common after 6000 hours.",
        "Mast scanner fault on EKS210 order picker — locks out at height.",
      ],
      questions: [
        { q: "ETV reach with forks tipping down under no load?", yes: "Lift chain stretch — Jungheinrich chain gauge spec", no: "Different mast issue" },
        { q: "Inner stage of reach drops slowly?", yes: "Free-lift cylinder seal — ETV214/216 wear pattern", no: "Main lift" },
        { q: "Visible hose chafe at mast carriage?", yes: "Re-route or replace — burst risk under load", no: "Internal hydraulic" },
        { q: "Order picker (EKS210) stops at certain height?", yes: "Mast scanner sensor — pull code", no: "Hydraulic pressure" },
      ],
    },
    brakes: {
      tendencies: [
        "Regen brake calibration drift on EFG AC drive — weak braking feel.",
        "Parking brake disc wear on ETV reach — won't hold on grade.",
        "Service brake by-wire sensor on newer Jungheinrich — safety critical.",
        "Brake pedal return spring on EFG — pedal stays down.",
        "Pedestrian truck (ESE) plug-brake contactor wear.",
      ],
      questions: [
        { q: "EFG with weak braking feel?", yes: "Regen calibration drift — recalibration procedure", no: "Mechanical brake" },
        { q: "ETV not holding on grade with load?", yes: "Parking brake disc wear — high-hour ETV", no: "Different parking system" },
        { q: "Pedal feels normal but no braking?", yes: "By-wire sensor — safety critical, investigate", no: "Mechanical fault" },
        { q: "Pedestrian truck with weak plug brake?", yes: "Plug-brake contactor wear — ESE service item", no: "Different brake fault" },
      ],
    },
    transmission: {
      tendencies: [
        "AC drive motor bearing wear on EFG/ETV — whine before growl.",
        "Hex coupling spline wear — clunk on direction change.",
        "Drive gear case oil leak at output seal — fluid under wheels.",
        "Drive parameter drift in Curtis controller — jerky starts.",
        "Older DC drive Jungheinrich: brush wear — slipping or no drive.",
      ],
      questions: [
        { q: "Drive whine progressing to growl?", yes: "AC drive motor bearing — EFG/ETV typical wear", no: "Different drive source" },
        { q: "Clunk on F/R direction change?", yes: "Hex coupling spline wear — replace coupling", no: "Other drivetrain" },
        { q: "Fluid leak at drive wheels?", yes: "Gear case output seal — replace seal, common service item", no: "Other leak source" },
        { q: "Legacy DC Jungheinrich with slipping drive?", yes: "Drive motor brushes — replace before commutator damage", no: "Different drive fault" },
      ],
    },
    electrical: {
      tendencies: [
        "Curtis controller codes on EFG/ETV — scanner standard procedure.",
        "Li-ion BMS fault on newer Jungheinrich — firmware reset sometimes resolves.",
        "Joystick sensor wear on EKS210 order picker — multi-axis fault.",
        "Harness chafe at mast pivot on ETV reach.",
        "ISM (Intelligent Service Management) module battery dead — fleet tracking dropout.",
      ],
      questions: [
        { q: "Curtis controller code displayed?", yes: "Code lookup — standard Curtis procedure", no: "No code path" },
        { q: "Li-ion truck with BMS warning?", yes: "BMS fault — try firmware reset before deeper diagnosis", no: "Different battery fault" },
        { q: "Order picker with multi-axis joystick issue?", yes: "Joystick sensor wear — EKS210 common", no: "Different control" },
        { q: "Faults when mast is fully raised?", yes: "Mast pivot harness chafe — ETV reach common", no: "Different routing" },
      ],
    },
    overheating: {
      tendencies: [
        "Traction motor overheat on EFG under heavy duty cycle.",
        "Controller heat sink fan failure — drive cuts back.",
        "Lift pump motor overheat on ETV — repeated cycles trigger thermal cut.",
        "Li-ion battery overheat from fast-charge cycling — BMS lockout.",
        "DC drive motor overheat on legacy Jungheinrich — brush/commutator wear.",
      ],
      questions: [
        { q: "Heavy duty cycle with motor overheat?", yes: "Application exceeds duty rating — review pattern", no: "Single component" },
        { q: "Controller overtemp code?", yes: "Heat sink fan or airflow blockage", no: "Different overheat" },
        { q: "Li-ion battery hot after fast charge?", yes: "Fast-charge cycling overheat — adjust charging pattern", no: "BMS or cell issue" },
        { q: "Legacy DC drive smell under load?", yes: "Brush/commutator overheat — immediate inspection", no: "Other source" },
      ],
    },
    noise: {
      tendencies: [
        "AC drive motor bearing growl on EFG/ETV — high-hour wear.",
        "Lift pump motor whine on ETV — bearing wear under load.",
        "Mast wheel flat spots on ETV reach — clicking with lift.",
        "Hex coupling rattle on Jungheinrich drive — direction change.",
        "Li-ion contactor click anomalies — high-current switching wear.",
      ],
      questions: [
        { q: "Drive wheels growling under load?", yes: "Drive motor bearing — EFG/ETV high-hour", no: "Other drivetrain" },
        { q: "Whine during lift?", yes: "Lift pump motor bearing — ETV wear", no: "Mast side" },
        { q: "Clicking accompanying jerky lift?", yes: "Mast wheel flat spots — replace wheels", no: "Different mast fault" },
        { q: "Unusual contactor clicking?", yes: "High-current contactor wear — Li-ion or legacy system, inspect", no: "Other source" },
      ],
    },
  },

  komatsu: {
    no_start: {
      tendencies: [
        "Seat switch / OPS failure on FG-T and FD-T series — connector corrosion.",
        "Nissan K21 LPG (FG25T/30T): lockoff solenoid after long sit.",
        "Komatsu 4D94LE diesel (FD-T): fuel pump priming weakness — long crank.",
        "FB-series electric: battery isolator switch wear — appears dead.",
        "Key barrel internal contact wear on older Komatsu — turn-and-jiggle to start.",
      ],
      questions: [
        { q: "Dash powers up with key?", yes: "Crank or fuel side", no: "Isolator, key, or main power" },
        { q: "K21 LPG with no-start after weekend?", yes: "Lockoff solenoid — Nissan K21 common", no: "Different LPG fault" },
        { q: "4D94LE diesel with long crank?", yes: "Fuel pump priming weakness — manual prime", no: "Glow plug or compression" },
        { q: "FB-series electric appears dead?", yes: "Main battery isolator wear — voltage check at terminal", no: "Different power issue" },
      ],
    },
    steering: {
      tendencies: [
        "Hydraulic orbital wear on FG-T/FD-T — solid Japanese build but eventual wear.",
        "Steer cylinder rod seal on FD30T — visible oil at rod.",
        "Tie rod end wear on FG-T series — wandering before clunk.",
        "Priority valve setting drift on FD40T — heavy steering under simultaneous lift.",
        "FB-series electric steering: encoder fault, code stored.",
      ],
      questions: [
        { q: "Spongy or delayed steering?", yes: "Orbital wear — solid Komatsu but eventual wear", no: "Mechanical or supply" },
        { q: "Oil at steer cylinder rod?", yes: "Rod seal — FD30T typical wear", no: "Internal hydraulic" },
        { q: "Wandering on straight?", yes: "Tie rod ends — FG-T inspection", no: "Hydraulic side" },
        { q: "FB electric with steering fault code?", yes: "Steer encoder — Komatsu Match scanner code lookup", no: "Hydraulic side" },
      ],
    },
    mast_hydraulic: {
      tendencies: [
        "Lift cylinder seal wear on FD30T — fork drift after high hours.",
        "Tilt cylinder seal on FG25T — mast creep under load.",
        "Mast chain stretch on FD-T — uneven fork height.",
        "Hydraulic control valve detent on FB-series — lever drift.",
        "Mast roller wear on FD40T heavy-duty — grease interval critical under load.",
      ],
      questions: [
        { q: "Load drifts down when held?", yes: "Lift cylinder seal — FD30T high-hour wear", no: "Different mast issue" },
        { q: "Mast tilts forward under load?", yes: "Tilt cylinder seals — FG25T common", no: "Valve centering" },
        { q: "Forks uneven after long use?", yes: "Chain stretch — measure with gauge", no: "Anchor or wear" },
        { q: "FD40T with mast roller binding?", yes: "Roller wear under heavy duty — increase grease frequency", no: "Different mast fault" },
      ],
    },
    brakes: {
      tendencies: [
        "Master cylinder bypass on FG-T/FD-T — pedal fades, Japanese-quality but eventual wear.",
        "Wet disc brake wear inside powershift trans on Komatsu — trans pull required.",
        "Parking brake cable stretch on FD30T — adjuster maxes out.",
        "Brake booster vacuum leak on FG25T — hard pedal.",
        "FB-series electric: regen brake calibration drift.",
      ],
      questions: [
        { q: "Pedal fades when held?", yes: "Master cylinder bypass — FG-T/FD-T typical wear", no: "External issue" },
        { q: "Powershift Komatsu with weak braking?", yes: "Wet disc wear — trans pull required", no: "External system" },
        { q: "Parking brake adjuster maxed?", yes: "Cable stretch — FD30T common", no: "Mechanism" },
        { q: "FB electric weak braking?", yes: "Regen calibration drift — recalibration procedure", no: "Different brake fault" },
      ],
    },
    transmission: {
      tendencies: [
        "Powershift clutch pack wear on FD30T — harsh engagement when warm.",
        "Inching valve adjustment drift on FG-T — poor creep.",
        "Trans cooler restriction on FD40T heavy-duty.",
        "Directional solenoid coil failure on FD-T — intermittent F or R.",
        "FB-series AC drive motor bearing — whine then growl.",
      ],
      questions: [
        { q: "Hard engagement when warm?", yes: "Clutch pack wear — FD30T powershift", no: "Cold issue is different" },
        { q: "F or R intermittently lost?", yes: "Directional solenoid coil — FD-T wear", no: "Mechanical clutch" },
        { q: "Trans overheats heavy duty cycle?", yes: "Cooler restriction — FD40T heavy use, clean cooler", no: "Internal" },
        { q: "FB electric with drive noise?", yes: "AC motor bearing — replace before failure", no: "Other source" },
      ],
    },
    electrical: {
      tendencies: [
        "Komatsu Match diagnostic codes — proprietary system, scanner required.",
        "Instrument cluster failure on older FG/FD-T — segment dropouts.",
        "Harness chafe at mast pivot on FD-T — Komatsu routing wear point.",
        "Throttle position sensor on K21 LPG — surging.",
        "FB-series controller faults — Komatsu OEM scanner standard.",
      ],
      questions: [
        { q: "Code displayed but no clear meaning?", yes: "Komatsu Match scanner code lookup — proprietary system", no: "No code path" },
        { q: "Instrument segments missing?", yes: "Cluster failure — older FG/FD-T, replace cluster", no: "Sender issue" },
        { q: "Issues when mast is raised?", yes: "Mast pivot harness chafe — FD-T routing wear", no: "Different location" },
        { q: "K21 LPG engine surging?", yes: "TPS wear — common Nissan K21 failure", no: "Different drivability" },
      ],
    },
    overheating: {
      tendencies: [
        "Radiator clogging on FD-T — Komatsu cores accumulate dust in warehouse use.",
        "Thermostat stuck on 4D94LE — rapid overheat.",
        "Water pump weep on Komatsu 4D94LE diesel.",
        "Cooling fan clutch failure on FD40T heavy-duty.",
        "FB-series motor overheat under heavy duty cycle.",
      ],
      questions: [
        { q: "How fast does it overheat?", yes: "Within minutes = thermostat or severe blockage", no: "Gradual" },
        { q: "Radiator clogged?", yes: "Clean core — Komatsu cores accumulate", no: "Internal flow" },
        { q: "Drip from water pump?", yes: "Pump seal — 4D94LE wear", no: "Other leak" },
        { q: "FB heavy duty cycle motor overheat?", yes: "Application duty rating — review pattern", no: "Component failure" },
      ],
    },
    noise: {
      tendencies: [
        "4D94LE injector tick on FD-T — wears with hours.",
        "Trans whine on FD-T powershift — input bearing wear.",
        "Hydraulic pump cavitation on cold starts — common Komatsu IC.",
        "Mast chain slap on FD-T — Komatsu tension spec.",
        "Exhaust manifold gasket leak on 4D94LE — ticking worsens with temp.",
      ],
      questions: [
        { q: "Ticking with engine RPM?", yes: "Injector wear or exhaust manifold gasket — 4D94LE", no: "Not engine-driven" },
        { q: "Whine from trans area?", yes: "Trans input bearing — FD-T high-hour wear", no: "Other source" },
        { q: "Whine on cold-start lift?", yes: "Pump cavitation — aerated oil, check level", no: "Bearing failure" },
        { q: "Mast chain rattle at rest?", yes: "Chain tension per Komatsu spec — verify and adjust", no: "Mast wheel noise" },
      ],
    },
  },
};
