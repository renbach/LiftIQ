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
};
