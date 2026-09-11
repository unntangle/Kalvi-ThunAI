// Class 10 Science — Samacheer Kalvi (2018 revision).
// 23 chapters: Physics 1–6, Chemistry 7–11, Biology 12–22, Computer Science 23.
// Each chapter carries the sub-topics the textbook lists inside it.

export const science = [
  ["Laws of Motion", [
    ["Newton's first law and inertia", "A body keeps doing what it was doing until an outside force changes it.", "no net force, no change in motion", "A bus brakes suddenly | No force acted on you | You keep moving forward", "cycle", "DurMU9c7hUw", {
      figures: ["inertia-bus", "coin-card"],
      deeper: "Inertia is not a force. Nothing pushes you forward when the bus brakes — the point is that nothing pushed you backwards either, so you carry on at the speed you already had. Mass is the measure of inertia, which is why a loaded lorry is harder to start and harder to stop than an empty one.",
      mistake: "Saying a force throws you forward when the bus stops. No forward force exists. The bus slowed and you did not.",
      tryIt: "Why does a coin placed on a card over a glass drop into the glass when the card is flicked away?",
      work: {
        question: "Why does dust fly off when a carpet is beaten with a stick?",
        lines: [
          ["Carpet and dust are both at rest", "Start from the state before anything happens."],
          ["The stick applies a force to the carpet only", "The dust is not touched by the stick."],
          ["The carpet moves; the dust has no force on it", "Inertia of rest keeps the dust where it was."],
          ["The carpet leaves the dust behind", "The separation is what we see as dust flying off."],
        ],
      },
    }],
    ["Newton's second law", "Force is what changes momentum, and mass decides how much force it takes.", "F = ma", "Mass 5 kg, acceleration 2 m/s² | Multiply them | The force needed is 10 N", "bar", "ZpbqEiD1FO0", {
      figures: ["force-mass-accel", "force-accel-graph"],
      deeper: "The law is really about momentum: force equals the rate at which momentum changes. F = ma is that statement for a body whose mass stays constant. Read as a proportion it says two things at once — for a fixed mass, more force gives more acceleration, and for a fixed force, more mass gives less.",
      mistake: "Treating F = ma as a formula for the force a moving body 'has'. A body has momentum, not force. Force is what changes it.",
      tryIt: "A 1200 kg car accelerates at 2.5 m/s². What force does the engine supply?",
      work: {
        question: "A force of 20 N acts on a 4 kg block. Find its acceleration.",
        lines: [
          ["F = 20 N,   m = 4 kg", "Write down what the question gives you."],
          ["F = ma", "Write the formula before substituting anything."],
          ["a = F / m", "Rearrange to make a the subject."],
          ["a = 20 / 4 = 5 m/s²", "Divide, and keep the unit with the answer."],
        ],
      },
    }],
    ["Newton's third law", "Forces come in pairs, equal in size and opposite in direction, on two different bodies.", "action and reaction on different bodies", "A gun fires a bullet forward | The gas pushes back on the gun | The gun recoils", "cycle", "jk7CQKKJOrw", {
      figures: ["action-reaction", "rocket-thrust"],
      deeper: "The phrase that matters is 'on two different bodies'. Action and reaction never cancel out, because they never act on the same thing. The gas pushes the bullet forward and the bullet's gas pushes the gun back — two bodies, two effects. If both forces acted on one body, nothing would ever accelerate.",
      mistake: "Concluding that action and reaction cancel, so nothing moves. They act on different bodies, so they cannot cancel.",
      tryIt: "A swimmer pushes the water backwards. Name the action and reaction forces, and say which body each acts on.",
      work: {
        question: "A 4 kg rifle fires a 20 g bullet at 200 m/s. Find the recoil velocity of the rifle.",
        lines: [
          ["m₁ = 0.02 kg,   v₁ = 200 m/s", "Convert the bullet's mass to kilograms first."],
          ["m₂ = 4 kg,   v₂ = ?", "The rifle's recoil is what we are looking for."],
          ["Total momentum before = 0", "Nothing was moving before the shot."],
          ["m₁v₁ + m₂v₂ = 0", "Momentum is conserved, so the total after is also zero."],
          ["v₂ = −(0.02 × 200) / 4 = −1 m/s", "The minus sign is the point: the rifle moves the other way."],
        ],
      },
    }],
    ["Momentum and impulse", "A small force for a long time can change momentum as much as a large force briefly.", "impulse = F × t = change in momentum", "A cricketer catches a ball | He pulls his hands back | The same momentum change takes longer, so the force is smaller", "bar"],
    ["Conservation of momentum", "With no outside force, total momentum before a collision equals total momentum after.", "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂", "A 2 kg ball at 3 m/s hits a still 1 kg ball | Total before is 6 kg·m/s | The total after must also be 6", "bar"],
    ["Gravitation, mass and weight", "Mass never changes; weight does, because it depends on the local value of g.", "W = mg", "A 60 kg student on Earth weighs about 588 N | On the Moon g is one sixth | The mass stays 60 kg but the weight drops", "map"],
    ["Apparent weight in a lift", "A lift changes the normal force on you, not your mass, which is why you feel lighter or heavier.", "R = m(g ± a)", "The lift accelerates upward | The floor must push harder than mg | You feel heavier though nothing about you changed", "cycle"],
  ]],

  ["Optics", [
    ["Refraction of light", "Light bends at a boundary because its speed changes between the two media.", "n₁ sin i = n₂ sin r", "Light passes from air into glass | Its speed drops | The ray bends towards the normal", "bar", "uow4TrKWZAA", {
      figures: ["refraction-ray", "stick-in-water"],
      deeper: "The bending is a consequence of the speed change, not a separate rule. Going into a denser medium the light slows, so the ray bends towards the normal; coming back out it speeds up and bends away. A ray that arrives straight along the normal does not bend at all, because there is no sideways difference for it to respond to.",
      mistake: "Measuring the angles from the surface instead of from the normal. Both i and r are measured from the normal.",
      tryIt: "A stick held in water looks bent at the surface. Which way does the submerged part appear to shift, and why?",
      work: {
        question: "Light passes from air into glass (n = 1.5) at an angle of incidence of 30°. Find the angle of refraction.",
        lines: [
          ["n₁ = 1.0 (air),   n₂ = 1.5 (glass)", "Note which medium the light starts in."],
          ["n₁ sin i = n₂ sin r", "Write Snell's law before substituting."],
          ["1.0 × sin 30° = 1.5 × sin r", "Substitute the known values."],
          ["sin r = 0.5 / 1.5 = 0.333", "sin 30° is 0.5, so divide by 1.5."],
          ["r = 19.5°", "Smaller than i, so the ray bent towards the normal as expected."],
        ],
      },
    }],
    ["Refractive index", "Refractive index compares the speed of light in vacuum with its speed in the medium.", "n = c / v", "Light travels slower in water than in air | Divide c by that slower speed | The answer, about 1.33, is water's refractive index", "bar", "CROVpI-07HI", {
      figures: ["refractive-index", "refractive-index-table"],
      deeper: "Because c is the fastest anything travels, n is always greater than 1, and a bigger n simply means a slower medium. It has no unit, since it is a speed divided by a speed. The relative index between two media is the ratio of their individual values, which is what Snell's law is really comparing.",
      mistake: "Giving the refractive index a unit. It is a ratio of two speeds, so the units cancel.",
      tryIt: "Light travels at 2.0 × 10⁸ m/s in a certain glass. Find its refractive index.",
      work: {
        question: "The refractive index of water is 1.33. Find the speed of light in water.",
        lines: [
          ["n = 1.33,   c = 3.0 × 10⁸ m/s", "Write down what is given."],
          ["n = c / v", "Write the formula before rearranging."],
          ["v = c / n", "Rearrange to make v the subject."],
          ["v = (3.0 × 10⁸) / 1.33", "Substitute the two values."],
          ["v = 2.26 × 10⁸ m/s", "Slower than in vacuum, as n greater than 1 requires."],
        ],
      },
    }],
    ["Total internal reflection", "Past the critical angle the light stops leaving the medium and reflects back instead.", "beyond the critical angle, no refraction", "Light travels from glass towards air | Increase the angle of incidence | Past the critical angle it reflects entirely", "cycle", "2O3EgK46EcE", {
      figures: ["total-internal-reflection", "optical-fibre"],
      deeper: "Two conditions have to hold together: the light must be going from the denser medium to the rarer one, and the angle of incidence must exceed the critical angle. At exactly the critical angle the refracted ray grazes along the boundary at 90°. This is what keeps a signal inside an optical fibre and what makes a diamond sparkle.",
      mistake: "Expecting total internal reflection going from air into glass. It only happens denser to rarer, never the other way.",
      tryIt: "Why does an optical fibre still carry light when it is bent around a corner?",
      work: {
        question: "Find the critical angle for water, which has a refractive index of 1.33.",
        lines: [
          ["n = 1.33, going from water into air", "Denser to rarer, so a critical angle exists."],
          ["At the critical angle, r = 90°", "The refracted ray just grazes along the boundary."],
          ["n sin C = 1 × sin 90°", "Snell's law with r set to 90°."],
          ["sin C = 1 / 1.33 = 0.752", "sin 90° is 1, so C depends only on n."],
          ["C = 48.8°", "Beyond this angle no light escapes the water at all."],
        ],
      },
    }],
    ["Lenses and image formation", "Where the object sits relative to the focus decides whether the image is real or virtual.", "1/v − 1/u = 1/f", "Object at 30 cm, f = 10 cm | 1/v = 1/10 − 1/30 | v = 15 cm, so the image is real", "grid"],
    ["Magnification and power", "Power is simply the reciprocal of focal length, which is why short lenses are strong.", "m = v/u · P = 1/f (in metres)", "A lens has f = 0.25 m | Take the reciprocal | Its power is +4 dioptres", "bar"],
    ["Defects of vision", "Myopia and hypermetropia are focusing errors, corrected by moving where the image lands.", "myopia: concave · hypermetropia: convex", "A myopic eye focuses in front of the retina | A concave lens diverges the light first | The image now lands on the retina", "bar"],
    ["Microscope and telescope", "Both instruments use two lenses, but for opposite reasons: one enlarges the near, one gathers the far.", "magnifying power = product of the two", "Light enters the objective lens | The eyepiece magnifies that first image | Total magnification is the product of the two", "map"],
  ]],

  ["Thermal Physics", [
    ["Thermal expansion", "Solids expand in length, area and volume, and the three coefficients are linked.", "α : β : γ = 1 : 2 : 3", "Heat a metal rod | Its length grows by αLΔT | Area and volume follow at twice and three times the rate", "bar"],
    ["Specific heat capacity", "Different substances need different amounts of heat for the same temperature rise.", "Q = mcΔT", "Heat 2 kg of water by 10 °C | c for water is 4200 J/kg·K | Q = 2 × 4200 × 10 = 84,000 J", "bar"],
    ["Latent heat", "During a change of state the heat goes into breaking bonds, so the temperature stays put.", "Q = mL", "Heat ice at 0 °C | The temperature does not rise while it melts | All the heat goes into the change of state", "cycle"],
    ["Calorimetry", "In an insulated mixture the heat lost by the hot body equals the heat gained by the cold one.", "heat lost = heat gained", "Mix hot and cold water | Write mcΔT for each side | Set them equal and solve for the final temperature", "bar"],
    ["Gas laws", "Pressure, volume and temperature of a gas are tied together by one combined relation.", "PV / T = constant", "Note the starting P, V and T | Write the same three after the change | Set the two ratios equal", "cycle"],
  ]],

  ["Electricity", [
    ["Electric current and potential difference", "Current is the rate at which charge flows; potential difference is what pushes it.", "I = Q / t · V = W / Q", "2 coulombs pass a point in 4 seconds | Divide charge by time | The current is 0.5 A", "bar"],
    ["Ohm's law", "Current through a conductor rises in step with the voltage across it.", "V = IR", "A 6 V cell across a 3 Ω resistor | Divide 6 by 3 | The current is 2 A", "bar"],
    ["Resistance and resistivity", "Resistance depends on the material, the length and the thickness of the wire.", "R = ρL / A", "Double the length of a wire | Nothing else changes | Its resistance doubles too", "bar"],
    ["Series and parallel circuits", "Series adds resistance; parallel always lowers it below the smallest one.", "series R = R₁ + R₂ · parallel 1/R = 1/R₁ + 1/R₂", "Two 6 Ω resistors in parallel | 1/R = 1/6 + 1/6 = 1/3 | So R = 3 Ω", "grid"],
    ["Heating effect of current", "Current through a resistance turns electrical energy into heat, usefully or wastefully.", "H = I²Rt", "2 A through 5 Ω for 10 s | I²R = 4 × 5 = 20 W | Over 10 s that is 200 J of heat", "bar"],
    ["Electric power and energy", "Power is the rate of using energy; the unit on your bill is the kilowatt hour.", "P = VI · 1 kWh = 3.6 × 10⁶ J", "A 1000 W heater runs for 2 hours | 1 kW × 2 h = 2 kWh | That is two units on the bill", "bar"],
    ["Domestic wiring and safety", "Fuse, earthing and a separate live and neutral are what make a house circuit safe.", "fuse in the live wire", "A fault sends a large current | The fuse wire melts first | The circuit breaks before anything else is damaged", "stack"],
  ]],

  ["Acoustics", [
    ["Sound waves and their speed", "Sound needs particles to pass the vibration along, so it cannot cross a vacuum.", "solids > liquids > gases", "A bell rings inside a jar | Pump the air out | The ringing fades because nothing carries it", "cycle"],
    ["Pitch, loudness and quality", "Frequency sets the pitch, amplitude the loudness, and waveform the quality.", "pitch ← frequency · loudness ← amplitude", "Tighten a string and pluck it | It vibrates faster | The pitch rises while the loudness is unchanged", "bar"],
    ["Echo and reverberation", "An echo needs enough distance for the reflection to arrive after the original has faded.", "at least 17.2 m for an echo", "Sound travels at about 344 m/s | The ear separates sounds 0.1 s apart | So the wall must be over 17.2 m away", "cycle"],
    ["Doppler effect", "Relative motion between source and listener changes the pitch that is heard.", "approaching raises pitch, receding lowers it", "An ambulance drives towards you | The waves arrive bunched together | The pitch you hear rises", "bar"],
    ["Ultrasound and its uses", "Frequencies above human hearing can be aimed in a narrow beam, which is what makes them useful.", "above 20,000 Hz", "A pulse is sent into the body | It reflects off a boundary | The return time gives the depth", "map"],
  ]],

  ["Nuclear Physics", [
    ["Radioactivity", "Unstable nuclei shed particles or energy until they reach a stable arrangement.", "alpha, beta and gamma", "An unstable nucleus emits an alpha particle | Its mass number drops by 4 | The atomic number drops by 2", "stack"],
    ["Properties of the three radiations", "Alpha, beta and gamma differ in charge, mass and how far they get through matter.", "alpha stopped by paper, gamma needs lead", "Place paper in the path to stop alpha | Aluminium stops beta | Only gamma gets through to the lead", "bar"],
    ["Half-life", "Each half-life halves what remains, so the decay never quite reaches zero.", "half the sample every half-life", "Start with 80 g | After one half-life, 40 g | After two, 20 g", "bar"],
    ["Nuclear fission", "Splitting a heavy nucleus releases energy and more neutrons, which can sustain a chain reaction.", "mass defect becomes energy", "Uranium-235 absorbs a neutron | The nucleus splits into two fragments | The missing mass appears as energy", "cycle"],
    ["Nuclear fusion", "Joining light nuclei releases even more energy, but needs enormous temperature to start.", "light nuclei join, energy released", "Hydrogen nuclei are forced together | They fuse into helium | The mass lost is released as energy", "cycle"],
    ["Radiation hazards and safety", "Ionising radiation damages living cells, so distance, shielding and time all matter.", "less time, more distance, more shielding", "Note the source and its strength | Increase distance and shielding | Keep exposure time as short as possible", "stack"],
  ]],

  ["Atoms and Molecules", [
    ["Atomic and molecular mass", "Masses are compared against one twelfth of a carbon-12 atom rather than measured in grams.", "relative to carbon-12", "Add the atomic masses in the formula | H₂O gives 1 + 1 + 16 | The molecular mass is 18 u", "stack"],
    ["Mole concept", "A mole is a counting word, like a dozen, but for 6.022 × 10²³ particles.", "1 mole = 6.022 × 10²³", "Take 2 moles of carbon | Multiply by 6.022 × 10²³ | That is 1.2044 × 10²⁴ atoms", "grid"],
    ["Avogadro's hypothesis", "Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules.", "same volume, same molecule count", "Take 1 L of oxygen and 1 L of nitrogen | Keep both at the same conditions | Each holds the same number of molecules", "bar"],
    ["Molar volume", "One mole of any gas fills the same volume at standard temperature and pressure.", "22.4 litres at STP", "Take 1 mole of any gas | Bring it to STP | It occupies 22.4 L whatever the gas is", "grid"],
    ["Relating mass, moles and particles", "Three quantities, two conversions, and most numerical questions in this chapter are one of them.", "mass → moles → particles", "Divide the mass by the molar mass | That gives the number of moles | Multiply by 6.022 × 10²³ for particles", "stack"],
  ]],

  ["Periodic Classification of Elements", [
    ["Modern periodic law", "Properties repeat according to atomic number, not atomic mass as Mendeleev first thought.", "properties are periodic functions of atomic number", "Arrange elements by atomic number | Similar properties recur at regular intervals | Those repeats form the groups", "grid"],
    ["Periods and groups", "Position in the table predicts how an element behaves before you ever test it.", "group decides valence electrons", "Sodium sits in group 1 | So it has one outer electron | It reacts by losing that electron", "grid"],
    ["Periodic trends", "Atomic size falls across a period and rises down a group, and reactivity follows.", "size falls across, rises down", "Compare sodium and chlorine | Chlorine is further right | Its atom is smaller despite more electrons", "bar"],
    ["Metallurgy", "Extracting a metal means concentrating the ore, reducing it, then refining what is left.", "concentration, reduction, refining", "Crush and concentrate the ore | Reduce the oxide to the metal | Refine it electrolytically", "stack"],
    ["Extraction of aluminium and iron", "The reactivity of the metal decides whether you reduce it with carbon or with electricity.", "reactive metals need electrolysis", "Iron oxide is reduced by carbon in a blast furnace | Aluminium is too reactive for that | It is extracted electrolytically instead", "cycle"],
    ["Alloys and corrosion", "Alloying changes properties on purpose; corrosion changes them by accident.", "alloy improves, corrosion destroys", "Iron rusts in damp air | Coating or alloying blocks the air and water | Stainless steel resists because of its chromium", "cycle"],
  ]],

  ["Solutions", [
    ["Types of solutions", "A solution is named by which state the solute and solvent are in.", "solute + solvent = solution", "Identify what dissolves and what it dissolves in | Note the state of each | Name the solution from that pair", "stack"],
    ["Solubility", "Solubility is fixed for a given substance at a given temperature, not an open-ended quantity.", "grams per 100 g of solvent", "Add solute until no more dissolves | Note the mass that did dissolve | That mass per 100 g is the solubility", "bar"],
    ["Saturated and supersaturated solutions", "Whether a solution is saturated depends on temperature as much as on how much you added.", "unsaturated · saturated · supersaturated", "Stir sugar into water until no more dissolves | That is saturated at this temperature | Warm it and more will dissolve", "cycle"],
    ["Hydrated salts and water of crystallisation", "Some crystals hold water inside their structure, and losing it changes their appearance.", "CuSO₄·5H₂O", "Blue copper sulphate holds five water molecules | Heat it and the water leaves | The crystal turns white", "stack"],
    ["Hygroscopic and deliquescent substances", "Some solids pull water from the air; the deliquescent ones dissolve in what they absorb.", "hygroscopic absorbs, deliquescent dissolves", "Leave the solid exposed to air | It absorbs moisture | If it forms a solution, it is deliquescent", "cycle"],
    ["Concentration of a solution", "Mass percentage and volume percentage both express concentration, but of different quantities.", "mass % = (mass of solute / mass of solution) × 100", "Dissolve 20 g in 80 g of water | The solution weighs 100 g | The mass percentage is 20%", "bar"],
  ]],

  ["Types of Chemical Reactions", [
    ["Combination and decomposition", "One reaction builds a compound from parts, the other pulls a compound apart.", "A + B → AB · AB → A + B", "Heat calcium carbonate | The compound breaks down | Calcium oxide and carbon dioxide are left", "cycle"],
    ["Displacement reactions", "A more reactive element pushes a less reactive one out of its compound.", "more reactive displaces less reactive", "Drop iron into copper sulphate solution | Iron is more reactive than copper | Copper is displaced and settles out", "bar"],
    ["Double displacement and precipitation", "Two compounds swap partners, and an insoluble product drops out as a precipitate.", "AB + CD → AD + CB", "Mix the two solutions | The ions exchange partners | The insoluble pair settles as a precipitate", "grid"],
    ["Ionic product of water and pH", "pH is a short way of writing the hydrogen ion concentration of a solution.", "pH = −log[H⁺]", "A solution has [H⁺] = 10⁻³ | Take the log to get −3 | The pH is 3, so it is acidic", "bar"],
    ["Acids, bases and salts", "A neutralisation is the reaction that turns an acid and a base into a salt and water.", "acid + base → salt + water", "Add the base to the acid | The H⁺ and OH⁻ combine into water | What remains in solution is the salt", "cycle"],
    ["Rate of reaction", "Temperature, concentration, surface area and catalysts all change how fast a reaction runs.", "more collisions, faster reaction", "Break the solid into smaller pieces | More surface is exposed | Collisions become more frequent and the rate rises", "bar"],
  ]],

  ["Carbon and its Compounds", [
    ["Catenation and bonding", "Carbon bonds to itself in chains and rings, which is why its compounds outnumber all others.", "four bonds, joined to itself", "Carbon has four outer electrons | It shares all four | Those bonds can link carbon to more carbon", "stack"],
    ["Hydrocarbons and IUPAC naming", "The name tells you the chain length, the bonding and the functional group, in that order.", "prefix + root + suffix", "Count the carbons for the root | Check for double or triple bonds | Add the suffix for the functional group", "stack"],
    ["Homologous series", "Members of a series differ by one CH₂, so properties change in a steady, predictable way.", "each member adds CH₂", "Methane has one carbon | Ethane has two | Every step up adds CH₂ and raises the boiling point", "bar"],
    ["Ethanol", "The first alcohol worth studying, both for its reactions and for its effects.", "C₂H₅OH", "Ethanol reacts with sodium | Hydrogen is released | Dehydrate it instead and you get ethene", "cycle"],
    ["Ethanoic acid", "A weak acid that still shows every acid reaction you would expect.", "CH₃COOH", "Add sodium carbonate to ethanoic acid | Carbon dioxide fizzes off | A salt and water are left behind", "cycle"],
    ["Soaps and detergents", "One end of the molecule holds water, the other holds grease, which is why cleaning works at all.", "one end polar, one end non-polar", "The non-polar tail buries itself in grease | The polar head stays in the water | The grease lifts away as a droplet", "stack"],
  ]],

  ["Anatomy and Plant Physiology", [
    ["Internal structure of a root", "A cross section shows which tissue carries water and which carries food.", "xylem inward, phloem outward", "Cut a thin section of the root | Stain and view it | Xylem and phloem alternate around the centre", "grid"],
    ["Internal structure of a stem", "The stem arranges its bundles differently in a dicot and a monocot, and that is the identifying test.", "dicot in a ring, monocot scattered", "Cut a thin section of the stem | Look at where the bundles sit | A neat ring means dicot", "grid"],
    ["Internal structure of a leaf", "The leaf is built around getting light in and gas exchange going without losing too much water.", "palisade above, spongy below", "Note the waxy cuticle on top | Palisade cells sit below it for light | Stomata on the underside handle gas exchange", "grid"],
    ["Photosynthesis", "Leaves build their own food using light, water and carbon dioxide.", "CO₂ + H₂O + light → glucose + O₂", "Water rises from the roots | The leaf takes in CO₂ and sunlight | Glucose is made and oxygen released", "cycle"],
    ["Light and dark reactions", "Light splits water and stores energy first; sugar is only built in the second stage.", "light → ATP + NADPH, then sugar", "Light strikes chlorophyll | Water splits and oxygen is released | ATP and NADPH drive the dark reaction", "cycle"],
    ["Respiration in plants", "Plants respire all the time, even while photosynthesising, which is why the two are easily confused.", "glucose + O₂ → CO₂ + H₂O + energy", "Note that photosynthesis needs light | Respiration continues day and night | At night only respiration is happening", "cycle"],
  ]],

  ["Structural Organisation of Animals", [
    ["Levels of organisation", "Cells form tissues, tissues form organs, and organs form systems.", "cell → tissue → organ → system", "Start with one muscle cell | Many alike form muscle tissue | Tissues together form the heart", "stack"],
    ["Earthworm: external features", "The segmented body, setae and clitellum are what identify the specimen.", "segments, setae, clitellum", "Note the ring-like segments | Find the setae used for grip | The swollen clitellum marks the front third", "map"],
    ["Earthworm: digestive system", "A straight tube from mouth to anus, with each stretch doing one job.", "mouth → pharynx → gizzard → intestine", "Follow the tube from the mouth | The gizzard grinds the soil | The intestine absorbs what is useful", "stack"],
    ["Earthworm: circulatory and nervous systems", "A closed circulation and a simple nerve cord run the length of the body.", "closed circulation, ventral nerve cord", "Trace the dorsal blood vessel | Note the lateral hearts | The nerve cord runs along the underside", "map"],
    ["Earthworm: reproduction", "The earthworm is hermaphrodite but still needs a partner, which is the point worth remembering.", "hermaphrodite, cross-fertilising", "Each worm carries both organs | Two worms still exchange sperm | The clitellum then forms the cocoon", "cycle"],
  ]],

  ["Transportation in Plants and Circulation in Animals", [
    ["Absorption of water by roots", "Water enters the root hair by osmosis, moving from where it is plentiful to where it is not.", "osmosis into the root hair", "Soil water is more dilute than cell sap | Water moves across the membrane | The root hair takes it in", "cycle"],
    ["Ascent of sap and transpiration pull", "Water lost at the leaf pulls the whole column up from the root.", "transpiration pull", "Water evaporates at the stomata | That creates tension in the xylem | The column is pulled upward", "cycle"],
    ["Translocation of food", "Phloem carries sugar from where it is made to wherever it is needed, in either direction.", "source to sink, both ways", "Sugar is loaded at the leaf | Water follows it into the phloem | Pressure pushes the sap towards the sink", "bar"],
    ["Blood and its components", "Plasma, red cells, white cells and platelets each do one job.", "plasma · RBC · WBC · platelets", "Spin a blood sample | Plasma separates on top | The cells settle by size and density", "stack"],
    ["Human heart and double circulation", "Blood passes through the heart twice in one full circuit of the body.", "pulmonary and systemic circuits", "Blood goes from the heart to the lungs | It returns to the heart | Only then is it pumped to the body", "cycle"],
    ["Blood pressure and the lymphatic system", "Lymph collects what leaks out of the capillaries and returns it to the blood.", "systolic over diastolic", "Fluid leaks from the capillaries into the tissue | Lymph vessels collect it | It rejoins the bloodstream near the neck", "map"],
  ]],

  ["Nervous System", [
    ["The neuron", "A neuron is built to carry a signal one way, from dendrite to axon terminal.", "dendrite → cell body → axon", "Signals arrive at the dendrites | They pass through the cell body | The axon carries them onward", "stack"],
    ["Nerve impulse", "A nerve impulse is a wave of charge reversal travelling along the membrane.", "resting −70 mV, then depolarisation", "The membrane sits at −70 mV | Sodium rushes in and flips the charge | The change travels down the axon", "bar"],
    ["Synapse and neurotransmitters", "The signal crosses the gap chemically, which is why it can only travel one way.", "chemical across the gap", "The impulse reaches the axon terminal | Transmitter is released into the gap | The next neuron picks it up and fires", "cycle"],
    ["Central nervous system", "The brain and spinal cord take in, decide and send out, and each brain region has its own job.", "cerebrum, cerebellum, medulla", "The cerebrum handles thought and memory | The cerebellum handles balance | The medulla runs breathing and heartbeat", "map"],
    ["Reflex action", "A reflex bypasses the brain, which is why it is faster than a decision.", "receptor → spinal cord → effector", "You touch something hot | The signal reaches the spinal cord | The order to pull back leaves before the brain knows", "cycle"],
    ["Peripheral and autonomic systems", "The autonomic system runs what you never think about, in two opposing halves.", "sympathetic speeds up, parasympathetic slows", "A sudden fright arrives | The sympathetic system raises heart rate | The parasympathetic system restores calm afterwards", "cycle"],
  ]],

  ["Plant and Animal Hormones", [
    ["Auxins", "Auxin gathers on the shaded side of a shoot, and that uneven growth is what bends it.", "auxin bends the shoot towards light", "Light falls on one side of a shoot | Auxin gathers on the shaded side | That side grows more, so the shoot bends", "cycle"],
    ["Gibberellins and cytokinins", "One stretches stems and breaks dormancy, the other drives cell division.", "gibberellin lengthens, cytokinin divides", "Apply gibberellin to a dwarf plant | The stems lengthen sharply | Cytokinin instead promotes cell division", "bar"],
    ["Abscisic acid and ethylene", "One tells the plant to shut down, the other tells the fruit to ripen.", "ABA closes stomata, ethylene ripens", "Water runs short | Abscisic acid closes the stomata | Water loss slows until conditions improve", "cycle"],
    ["Endocrine glands", "Hormones travel in the blood, so a small amount can act far from where it was made.", "ductless glands, blood transport", "The pancreas releases insulin | It travels in the blood | Cells across the body take up glucose", "stack"],
    ["Pituitary, thyroid and adrenal glands", "Each gland has one headline hormone and one disorder that comes from too much or too little.", "growth · thyroxine · adrenaline", "The pituitary controls growth | The thyroid sets metabolic rate | The adrenal prepares the body for action", "map"],
    ["Feedback control", "A hormone that shuts down its own trigger is what keeps the level steady.", "negative feedback", "Blood glucose rises | Insulin is released and glucose falls | The falling level switches insulin off again", "cycle"],
  ]],

  ["Reproduction in Plants and Animals", [
    ["Asexual reproduction", "One parent, no gametes, and offspring that are genetically identical to it.", "identical clone", "A potato sprouts from its eye | No gametes are involved | The new plant is genetically identical", "cycle"],
    ["Sexual reproduction in flowering plants", "Pollination brings the gametes together; fertilisation joins them.", "pollination then fertilisation", "Pollen lands on the stigma | A tube grows down to the ovule | The male nucleus reaches the egg", "stack"],
    ["Double fertilisation", "Two male nuclei are delivered, one for the embryo and one for its food store.", "one to the zygote, one to the endosperm", "Two male nuclei travel down the tube | One fuses with the egg | The other forms the endosperm", "grid"],
    ["Human male reproductive system", "The organs are arranged around producing, storing and delivering sperm.", "testes, ducts, glands", "Sperm are produced in the testes | They mature and are stored in the epididymis | The ducts carry them out", "map"],
    ["Human female reproductive system", "The organs produce the egg, receive the sperm and support the embryo.", "ovary, oviduct, uterus", "The ovary releases an egg | Fertilisation happens in the oviduct | The embryo implants in the uterus", "map"],
    ["Menstrual cycle", "About 28 days, driven by hormones, and ovulation sits roughly in the middle.", "ovulation around day 14", "The lining thickens after menstruation | An egg is released around day 14 | If it is not fertilised the lining is shed", "cycle"],
  ]],

  ["Heredity", [
    ["Mendel and his pea experiments", "Choosing one clearly contrasting character at a time is what made the results readable.", "one character, true-breeding parents", "Pick a character with two clear forms | Cross true-breeding parents | Count the offspring types rather than describing them", "stack"],
    ["Monohybrid cross", "A Punnett square makes the ratio visible instead of remembered.", "Tt × Tt → 1 TT : 2 Tt : 1 tt", "Draw a 2 by 2 square | Put one parent's alleles on each side | Fill the four boxes and count", "grid"],
    ["Dihybrid cross", "Two characters tracked at once give the 9 : 3 : 3 : 1 ratio.", "9 : 3 : 3 : 1", "Draw a 4 by 4 square | List the four gamete types on each side | Fill the sixteen boxes and group them", "grid"],
    ["Laws of inheritance", "Dominance, segregation and independent assortment are the three claims Mendel's data supports.", "dominance · segregation · independent assortment", "Each gamete carries one allele of a pair | Different pairs assort independently | The observed ratios follow from both", "stack"],
    ["Chromosomes and genes", "A gene is a stretch of DNA at a fixed place on a chromosome.", "gene = a locus on a chromosome", "Chromosomes come in pairs | Each carries genes at fixed positions | The pair holds two alleles of each gene", "stack"],
    ["Sex determination in humans", "The father's contribution decides the sex, since only he can supply a Y.", "XX female, XY male", "The mother always gives an X | The father gives X or Y | Which one he gives decides the outcome", "grid"],
    ["Mutation", "A change in the DNA sequence, which may be harmless, harmful or occasionally useful.", "a change in the base sequence", "A base is changed during copying | The protein it codes for may change | The effect depends on which base and where", "cycle"],
  ]],

  ["Origin and Evolution of Life", [
    ["Origin of life", "The chemical route from simple molecules to the first cell is the question this section sets out.", "chemical evolution before biological", "Simple molecules form in early conditions | They combine into larger ones | Those aggregate into the first cell-like structures", "cycle"],
    ["Evidences of evolution", "Fossils, comparative anatomy and embryology point independently to common descent.", "fossil · anatomical · embryological", "Compare a whale flipper and a human arm | The same bones appear in both | That shared plan points to a common ancestor", "map"],
    ["Homologous and analogous organs", "Same structure with different jobs, against different structure with the same job.", "homologous: common origin · analogous: common function", "Compare a bat wing and a bird wing | The bones differ but the job is the same | That makes them analogous, not homologous", "grid"],
    ["Lamarckism and Darwinism", "One says use and disuse changes the body, the other says variation already exists and is selected.", "acquired characters versus natural selection", "Lamarck says the giraffe stretched its neck | Darwin says longer necks already varied | Only Darwin's version survives testing", "bar"],
    ["Natural selection", "Variation already exists; the environment decides which variants leave more offspring.", "variation, selection, inheritance", "A population varies in one trait | The environment favours one variant | That variant becomes commoner over generations", "cycle"],
    ["Human evolution", "A sequence of forms, each closer to the modern one in posture, brain size and tool use.", "posture, brain size, tools", "Compare skull capacity across the forms | Note the shift to upright walking | Tool use appears and grows more complex", "map"],
  ]],

  ["Breeding and Biotechnology", [
    ["Plant breeding", "Selecting parents for a wanted trait concentrates that trait over generations.", "select, cross, repeat", "Choose two high-yield plants | Cross them and keep the best offspring | Repeat until the trait is stable", "stack"],
    ["Animal breeding", "Inbreeding fixes a trait but narrows the gene pool; outbreeding restores vigour.", "inbreeding fixes, outbreeding revives", "Breed within a line to fix the trait | Vigour starts to fall | Cross with an unrelated line to restore it", "cycle"],
    ["Genetic engineering", "A gene can be cut from one organism and inserted into another using a vector.", "cut, insert, express", "Cut the insulin gene with a restriction enzyme | Insert it into a bacterial plasmid | The bacterium now makes human insulin", "cycle"],
    ["Tissue culture", "A few cells on the right medium can regrow a whole plant, identical to the parent.", "totipotency of plant cells", "Take a small piece of tissue | Grow it on a nutrient medium | It develops into a complete plantlet", "grid"],
    ["Applications and bioethics", "The techniques work; the argument is about where they should and should not be used.", "capability is not permission", "List what the technique makes possible | Ask who benefits and who carries the risk | Weigh the two before deciding", "stack"],
  ]],

  ["Health and Diseases", [
    ["Balanced diet and nutrients", "Each nutrient has one job, so a shortage shows up as a specific disorder.", "nutrient missing, disorder follows", "Note the nutrients in a day's food | Find the one that is short | The matching deficiency explains the symptom", "stack"],
    ["Deficiency diseases", "Vitamin and mineral shortages produce named conditions that are largely preventable.", "scurvy, rickets, anaemia, goitre", "Identify the symptom | Match it to the nutrient responsible | Correct the diet rather than treating the symptom alone", "bar"],
    ["Communicable diseases", "A disease spreads only if the pathogen has a route from one host to the next.", "break the route, stop the spread", "Identify the pathogen and its carrier | Find how it reaches a new host | Block that route to stop the outbreak", "map"],
    ["Non-communicable diseases", "Diabetes, heart disease and cancer build up over years rather than passing between people.", "lifestyle and long build-up", "Note the risk factors present | Most are habits rather than infections | Changing them early is the whole treatment", "cycle"],
    ["Drug abuse and its effects", "Dependence changes the body's chemistry, which is what makes stopping so difficult.", "tolerance, then dependence", "Repeated use raises tolerance | Larger doses are needed for the same effect | Dependence follows and withdrawal becomes hard", "stack"],
    ["Personal and community hygiene", "Most communicable disease is stopped by clean water, clean hands and proper waste disposal.", "water, hands, waste", "Trace how the pathogen reaches people | Usually it is water or hands | Fixing that one step protects everyone", "cycle"],
  ]],

  ["Environmental Management", [
    ["Environmental issues", "Pollution, deforestation and climate change are linked, not separate problems.", "one system, connected effects", "Name the immediate effect | Trace what caused it | Note what that cause also affects elsewhere", "map"],
    ["Conservation of resources", "Using less, reusing more and choosing renewables is what stretches a resource.", "reduce · reuse · recycle", "Note your household water use | Find the step that wastes most | Change that step first", "bar"],
    ["Waste management", "Separating waste at the source is what makes everything downstream possible.", "segregate at source", "Keep wet and dry waste apart | Wet waste goes to compost | Dry waste can then be recycled", "cycle"],
    ["Biodiversity and its conservation", "Protecting a habitat protects every species in it, which single-species efforts cannot.", "protect habitats, not only species", "Identify the habitat under threat | Note the species that depend on it | Protecting the habitat protects them all", "map"],
    ["Sustainable development", "Meeting present needs without removing the options of the people who come next.", "present needs, future options", "Note what the activity uses up | Ask whether it can be maintained | If not, find the version that can", "stack"],
  ]],

  ["Visual Communication", [
    ["Animation and its principles", "An animation is a sequence of still frames shown fast enough to read as motion.", "frames per second", "Draw a figure slightly moved in each frame | Play them at 24 frames a second | The eye reads it as movement", "bar"],
    ["Types of animation", "2D, 3D, stop motion and cut-out differ in how each frame is produced, not in the principle.", "2D · 3D · stop motion", "Decide how each frame will be made | Drawn frames give 2D | Photographed objects give stop motion", "stack"],
    ["Multimedia and its components", "Text, image, audio, video and animation combined carry more than any one of them alone.", "text + image + audio + video", "Start with the message | Choose the medium that carries it best | Combine only what adds meaning", "stack"],
    ["Animation tools and file formats", "The format decides file size, quality and whether transparency or motion survives.", "GIF, PNG, JPEG, MP4", "Decide what the file must carry | Motion needs a video format | Transparency needs PNG rather than JPEG", "grid"],
    ["Careers in visual communication", "Animation, graphic design, web design and film each use the same base skills differently.", "one skill set, several routes", "List the skills the field needs | Note which role uses which most | Pick the route that matches your strength", "map"],
  ]],
];
