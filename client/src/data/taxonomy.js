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
};
