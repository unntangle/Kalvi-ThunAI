// Classes 11 and 12. Same shape as the junior data in curriculum.js:
// seniorRaw[class][subjectId] = [ [chapterTitle, [ [concept, summary, keyLine, "step | step | step", avType] ] ] ]
//
// Class 10 lives in data/class10/ instead. Its chapter list follows the real
// SSLC textbook index and is long enough to deserve a file per subject.

export const seniorRaw = {
  11: {
    tamil: [
      ["இலக்கிய வரலாறு", [
        ["சங்க இலக்கியம்", "The earliest Tamil corpus, grouped as the eight anthologies and the ten songs.", "எட்டுத்தொகை, பத்துப்பாட்டு", "Note the two collections | Each holds poems of அகம் and புறம் | Together they form சங்க இலக்கியம்", "stack"],
        ["அகம், புறம்", "Tamil poetics divides all experience into the inner life and the public life.", "அகம் = inner, புறம் = outer", "A love poem is அகம் | A war or praise poem is புறம் | The division decides the conventions used", "cycle"],
      ]],
      ["இலக்கணம் — பொருள்", [
        ["திணை", "Landscape and the emotion tied to it form the setting of a classical poem.", "ஐந்திணை", "Identify the landscape named | Each carries its own mood | குறிஞ்சி carries union, பாலை separation", "map"],
        ["துறை", "Within a திணை, the துறை names the exact situation being described.", "திணைக்குள் ஒரு சூழல்", "Fix the திணை first | Then name the situation inside it | That situation is the துறை", "stack"],
      ]],
    ],
    english: [
      ["Sentence structure", [
        ["Simple, compound, complex", "The number and kind of clauses decide what a sentence is called.", "one clause, two main, main plus subordinate", "Count the finite verbs | Two joined by and is compound | One depending on another is complex", "stack"],
        ["Transforming sentences", "The same idea can be carried in any of the three structures without changing meaning.", "meaning fixed, structure free", "He was tired, so he rested | Join with a subordinator | Because he was tired, he rested", "cycle"],
      ]],
      ["Writing for a purpose", [
        ["Precis writing", "A precis keeps the argument and drops the illustration, at about a third of the length.", "one third, own words", "Read and find the central argument | Strike out examples and repetition | Rewrite in your own words", "bar"],
        ["The formal letter", "State the request in the first line, justify it in the second paragraph, close.", "request, reason, close", "Open with what you are asking for | Give the reason next | Close with thanks and your name", "stack"],
      ]],
    ],
    maths: [
      ["Sets, relations and functions", [
        ["Cartesian product", "Pairing every element of one set with every element of another builds the product set.", "n(A × B) = n(A) × n(B)", "A has 3 elements, B has 4 | Every a pairs with every b | A × B has 12 ordered pairs", "grid"],
        ["Types of functions", "One-one, onto and bijection describe how inputs map onto outputs.", "injective, surjective, bijective", "Check if two inputs share an output | If not, it is one-one | If every output is used, it is onto", "cycle"],
      ]],
      ["Matrices and determinants", [
        ["Matrix multiplication", "Row of the first times column of the second, so the inner dimensions must match.", "(m × n)(n × p) = m × p", "A is 2 × 3, B is 3 × 2 | The inner 3s match | The product is 2 × 2", "grid"],
        ["Determinant of a 2 × 2", "The determinant tells you whether the matrix can be inverted at all.", "|A| = ad − bc", "Take [[3,1],[2,4]] | ad = 12, bc = 2 | The determinant is 10, so an inverse exists", "bar"],
      ]],
    ],
    physics: [
      ["Kinematics", [
        ["Equations of motion", "Three equations connect displacement, velocity, acceleration and time for constant acceleration.", "v = u + at · s = ut + ½at²", "u = 0, a = 2 m/s², t = 5 s | v = 0 + 2 × 5 = 10 m/s | s = 0 + ½ × 2 × 25 = 25 m", "bar"],
        ["Projectile motion", "Horizontal and vertical motion are independent, which is why the path is a parabola.", "range = u² sin2θ / g", "Split the launch velocity | Horizontal stays constant | Vertical slows, stops, then falls", "grid"],
      ]],
      ["Laws of motion and friction", [
        ["Free body diagrams", "Draw only the forces acting on the one body you care about, then resolve them.", "one body, every force on it", "Isolate the block | Mark weight, normal and friction | Resolve along and across the surface", "stack"],
        ["Static and kinetic friction", "It takes more force to start a body moving than to keep it moving.", "f ≤ μₛN, then f = μₖN", "Push gently and nothing moves | Friction rises to match your push | Past the limit, it drops to kinetic", "bar"],
      ]],
    ],
    chemistry: [
      ["Atomic structure", [
        ["Quantum numbers", "Four numbers fix the address of an electron inside an atom.", "n, l, mₗ, mₛ", "n gives the shell | l gives the subshell shape | mₗ and mₛ fix orientation and spin", "stack"],
        ["Electronic configuration", "Electrons fill the lowest available energy level first, one spin at a time.", "Aufbau, Pauli, Hund", "Take sulphur, 16 electrons | Fill 1s, 2s, 2p, 3s | The last six go into 3p", "grid"],
      ]],
      ["Chemical bonding", [
        ["Ionic and covalent bonds", "A large electronegativity gap transfers electrons; a small one shares them.", "transfer versus share", "Compare NaCl and Cl₂ | Sodium and chlorine differ widely | Electrons transfer, giving an ionic bond", "cycle"],
        ["VSEPR shapes", "Electron pairs push apart as far as possible, and that sets the molecular shape.", "pairs repel, shape follows", "Count bond and lone pairs | Four pairs arrange tetrahedrally | Two lone pairs bend the molecule", "grid"],
      ]],
    ],
    biology: [
      ["Cell structure", [
        ["Prokaryote and eukaryote", "The presence of a true nucleus is the dividing line between the two cell types.", "no nucleus versus true nucleus", "Look for a nuclear membrane | Bacteria have none | So bacteria are prokaryotic", "stack"],
        ["Cell organelles", "Each organelle is a compartment that keeps one job separate from the rest.", "compartment, one function", "Mitochondria release energy | Ribosomes build protein | Keeping them apart keeps both efficient", "cycle"],
      ]],
      ["Plant physiology", [
        ["Transpiration", "Water lost at the leaf pulls the whole column up from the root.", "transpiration pull", "Water evaporates at the stomata | That creates tension in the xylem | The column is pulled upward", "cycle"],
        ["Photosynthesis: light reaction", "Light splits water and stores energy as ATP and NADPH before any sugar is made.", "light → ATP + NADPH + O₂", "Light strikes chlorophyll | Water splits, releasing oxygen | ATP and NADPH are stored for the dark reaction", "cycle"],
      ]],
    ],
    compsci: [
      ["Problem solving", [
        ["Algorithm and flowchart", "Write the steps before the code, because a wrong plan compiles just as well as a right one.", "steps first, syntax later", "State the input and output | List the steps in order | Only then write the code", "stack"],
        ["Time complexity", "Complexity describes how the work grows as the input grows, not how long one run takes.", "O(n), O(n²), O(log n)", "A single loop over n items is O(n) | Nest a second loop and it is O(n²) | Doubling n quadruples the work", "bar"],
      ]],
      ["Python fundamentals", [
        ["Data types and variables", "A Python name is a label attached to an object, not a fixed box of a given size.", "names bind to objects", "Write x = 5 | x now labels an integer | Write x = 'five' and the same name labels a string", "stack"],
        ["Loops and conditionals", "A condition chooses a branch, a loop repeats a block until its condition fails.", "if chooses, while repeats", "Set a counter to 1 | While it is under 5, print and add one | The loop ends when the test fails", "cycle"],
      ]],
    ],
    accountancy: [
      ["Fundamentals of accounting", [
        ["The accounting equation", "Every transaction keeps the two sides of the equation balanced.", "Assets = Liabilities + Capital", "Owner brings in ₹1,00,000 | Cash rises by 1,00,000 | Capital rises by the same, so it balances", "bar"],
        ["Double entry", "Every transaction is recorded twice, once as a debit and once as a credit.", "debit what comes in, credit what goes out", "Goods are bought for cash | Purchases are debited | Cash is credited by the same amount", "cycle"],
      ]],
      ["Books of accounts", [
        ["Journal entries", "The journal records transactions in date order before anything is grouped.", "date, particulars, debit, credit", "Identify the two accounts | Decide which is debited | Record both with the same amount", "stack"],
        ["Trial balance", "Totalling all debits and all credits proves the arithmetic, though not the judgement.", "total debits = total credits", "List every ledger balance | Total the debit column | If it matches the credit total, the books tally", "grid"],
      ]],
    ],
    commerce: [
      ["Business and trade", [
        ["Forms of business organisation", "Liability, control and continuity are what separate one form from another.", "proprietorship, partnership, company", "Ask who bears the loss | A proprietor bears it alone | A company limits it to the investment", "stack"],
        ["Trade and aids to trade", "Banking, insurance, transport and warehousing exist to make trade possible.", "trade plus its supporting services", "Goods move from maker to buyer | Transport and warehousing carry and hold them | Banking and insurance cover the risk", "cycle"],
      ]],
      ["Business finance", [
        ["Sources of finance", "How long you need the money for decides where you should get it from.", "short, medium and long term", "A short cash gap needs an overdraft | New machinery needs a term loan | Expansion may need shares", "bar"],
        ["Shares and debentures", "A share buys ownership, a debenture only lends money at a fixed return.", "ownership versus borrowing", "A shareholder gets a variable dividend | A debenture holder gets fixed interest | Only one of them owns part of the company", "stack"],
      ]],
    ],
    economics: [
      ["Introduction to economics", [
        ["Scarcity and choice", "Wants are unlimited, means are limited, so every choice gives something up.", "opportunity cost", "You have one free hour | Studying means not playing | The game you gave up is the opportunity cost", "bar"],
        ["Central problems", "Every economy must settle what to produce, how, and for whom.", "what, how, for whom", "Decide which goods to make | Decide the method and technology | Decide who receives the output", "cycle"],
      ]],
      ["Demand and supply", [
        ["Law of demand", "Other things equal, a rise in price lowers the quantity people are willing to buy.", "price up, quantity demanded down", "Price rises from ₹10 to ₹15 | Buyers switch or buy less | Quantity demanded falls", "bar"],
        ["Market equilibrium", "Price settles where the quantity buyers want equals the quantity sellers offer.", "demand = supply", "Above equilibrium there is a surplus | Sellers cut price | The cut continues until the two match", "grid"],
      ]],
    ],
    busmaths: [
      ["Applications of matrices", [
        ["Rank of a matrix", "The rank tells you how many genuinely independent rows the matrix holds.", "rank = order of the largest non-zero minor", "Reduce to echelon form | Count the non-zero rows | That count is the rank", "grid"],
        ["Solving a system", "The rank of the coefficient and augmented matrices decides whether a solution exists.", "equal ranks, consistent system", "Form the augmented matrix | Compare the two ranks | Equal ranks mean a solution exists", "stack"],
      ]],
      ["Interest and annuities", [
        ["Compound interest", "Interest earns interest, so the growth is geometric rather than straight.", "A = P(1 + r/n)^(nt)", "₹10,000 at 10% for 2 years | Year one gives ₹11,000 | Year two earns on 11,000, giving ₹12,100", "bar"],
        ["Annuity", "A fixed payment made at regular intervals, valued by discounting each instalment.", "regular payment, discounted", "Pay ₹1,000 each year for 3 years | Discount each payment to today | The sum is the present value", "stack"],
      ]],
    ],
  },

  12: {
    tamil: [
      ["இலக்கியம் — காப்பியம்", [
        ["ஐம்பெருங்காப்பியங்கள்", "Five long narrative poems form the classical Tamil epic tradition.", "சிலப்பதிகாரம் முதலான ஐந்து", "Name the five epics | Note the era each belongs to | சிலப்பதிகாரம் is the earliest of them", "stack"],
        ["சிலப்பதிகாரம்", "An epic built around an ordinary family, which is why it reads as social history.", "மூவேந்தர் நாட்டு வரலாறு", "Follow Kannagi's journey | Each land she crosses is described | The epic doubles as a record of its time", "map"],
      ]],
      ["இலக்கணம் — மொழிபெயர்ப்பும் பயன்பாடும்", [
        ["கலைச்சொல்லாக்கம்", "Building Tamil technical vocabulary keeps the language usable in new fields.", "தமிழில் புதிய கலைச்சொல்", "Take an English technical term | Find the Tamil root that fits | Coin a word that stays transparent", "cycle"],
        ["மரபுத் தொடர் பிழை", "A fixed phrase used with the wrong verb is a common exam error.", "ஒவ்வொரு பொருளுக்கும் தன் வினை", "Say நீர் ஓடியது, not நீர் நடந்தது | Each noun carries its own verb | Learn them as pairs", "stack"],
      ]],
    ],
    english: [
      ["Advanced grammar", [
        ["Conditional clauses", "The three types differ by how likely the condition is, and the tenses follow from that.", "if + present/past/past perfect", "If it rains, we stay is real | If it rained, we would stay is unlikely | If it had rained is now impossible", "bar"],
        ["Relative and participle clauses", "A participle clause shortens a relative clause without losing the link.", "who is waiting → waiting", "The man who is waiting is my uncle | Drop who is | The man waiting is my uncle", "cycle"],
      ]],
      ["Writing skills", [
        ["Argumentative essay", "State the position, give the strongest opposing case, then answer it.", "claim, counter-claim, response", "State your position in the opening | Give the best case against it | Answer that case and close", "stack"],
        ["Job application", "The covering letter should say what you can do, not what you hope to gain.", "what you offer, not what you want", "Name the post in the first line | Match your record to what it asks for | Close with availability", "bar"],
      ]],
    ],
    maths: [
      ["Applications of differentiation", [
        ["Maxima and minima", "Where the gradient is zero the curve turns, and the second derivative says which way.", "f′(x) = 0, then check f″(x)", "Differentiate and set to zero | Solve for x | If f″(x) > 0, that point is a minimum", "bar"],
        ["Rate of change", "A derivative is a rate, so word problems become derivatives once you name the variables.", "dy/dx is a rate", "A balloon's radius grows at 2 cm/s | Volume depends on radius | Differentiate V with respect to t", "cycle"],
      ]],
      ["Integration", [
        ["Definite integrals", "A definite integral measures the area under a curve between two limits.", "∫ₐᵇ f(x) dx = F(b) − F(a)", "Integrate x² to get x³/3 | Evaluate at 3 and at 1 | 9 − 1/3 gives the area", "grid"],
        ["Integration by parts", "Used when the integrand is a product of two unlike functions.", "∫u dv = uv − ∫v du", "Take ∫x·eˣ dx | Let u = x and dv = eˣ dx | The result is x·eˣ − eˣ + C", "stack"],
      ]],
    ],
    physics: [
      ["Electrostatics", [
        ["Coulomb's law", "The force between two charges falls with the square of the distance between them.", "F = kq₁q₂ / r²", "Double the separation | r² becomes four times larger | The force drops to a quarter", "bar"],
        ["Electric potential", "Potential is the work needed to bring unit charge from infinity to a point.", "V = kQ / r", "Fix a charge Q | Move a test charge inward | The work done per unit charge is the potential", "cycle"],
      ]],
      ["Current electricity", [
        ["Kirchhoff's laws", "Charge is conserved at a junction and energy is conserved around a loop.", "ΣI = 0 at a node · ΣV = 0 in a loop", "Mark currents at the junction | In equals out | Then sum the voltages around each loop to zero", "grid"],
        ["Wheatstone bridge", "When the bridge balances, no current flows through the middle branch.", "P/Q = R/S at balance", "Adjust until the galvanometer reads zero | The ratios are now equal | Solve for the unknown resistance", "stack"],
      ]],
    ],
    chemistry: [
      ["Solutions and colligative properties", [
        ["Molarity and molality", "One is per litre of solution, the other per kilogram of solvent, and only one changes with temperature.", "M = mol/L · m = mol/kg", "Dissolve 1 mol in 1 L of solution | That is 1 M | The same in 1 kg of solvent would be 1 m", "bar"],
        ["Depression in freezing point", "Adding a solute lowers the freezing point in proportion to the particle count.", "ΔTf = Kf · m", "Dissolve salt in water | Particles interfere with crystal formation | The water now freezes below 0 °C", "cycle"],
      ]],
      ["Chemical kinetics", [
        ["Rate and order", "Order is found by experiment, not by reading the balanced equation.", "rate = k[A]ᵐ[B]ⁿ", "Double [A] and watch the rate | If the rate doubles, m = 1 | Repeat for B to find n", "bar"],
        ["Activation energy", "Only collisions with enough energy and the right orientation lead to a reaction.", "higher Eₐ, slower reaction", "Molecules collide constantly | Most bounce off | Only those above Eₐ react", "cycle"],
      ]],
    ],
    biology: [
      ["Genetics", [
        ["Mendel's laws", "Traits are carried by separate factors that segregate independently into gametes.", "segregation and independent assortment", "Cross two heterozygotes | Each gamete carries one allele | The offspring show a 3 to 1 ratio", "grid"],
        ["Monohybrid cross", "A Punnett square makes the ratio visible instead of remembered.", "Tt × Tt → 1 TT : 2 Tt : 1 tt", "Draw a 2 by 2 square | Put one parent's alleles on each side | Fill the four boxes and count", "grid"],
      ]],
      ["Human physiology", [
        ["Nephron and urine formation", "Filtration, reabsorption and secretion happen in three distinct stretches of the nephron.", "filter, reabsorb, secrete", "Blood is filtered at the glomerulus | Useful matter is reabsorbed in the tubule | What remains is urine", "cycle"],
        ["Neural conduction", "A nerve impulse is a wave of charge reversal travelling along the membrane.", "resting −70 mV, then depolarisation", "The membrane sits at −70 mV | Sodium rushes in and flips the charge | The change travels down the axon", "bar"],
      ]],
    ],
    compsci: [
      ["Object oriented programming", [
        ["Classes and objects", "A class is the design, an object is one thing built to that design.", "class defines, object exists", "Write a class Student | Create two objects from it | Each holds its own data, same behaviour", "stack"],
        ["Inheritance", "A child class keeps what the parent has and adds or changes only what differs.", "child extends parent", "Write a class Person | Derive Student from it | Student keeps name and adds a roll number", "cycle"],
      ]],
      ["Databases with SQL", [
        ["SELECT and WHERE", "The query names the columns first, then the table, then the filter.", "SELECT cols FROM table WHERE cond", "Name the columns you want | Name the table they live in | Add the condition that filters rows", "stack"],
        ["Joins", "A join matches rows across two tables using a column they share.", "ON left.key = right.key", "Two tables share a student id | Join on that column | Each matched pair becomes one row", "grid"],
      ]],
    ],
    accountancy: [
      ["Partnership accounts", [
        ["Profit sharing", "Profit follows the agreed ratio, and in its absence the law says share equally.", "no agreement means equal shares", "Profit is ₹60,000, ratio 2:1 | Split into three parts of 20,000 | One partner gets 40,000, the other 20,000", "bar"],
        ["Goodwill on admission", "A new partner pays for a share of value the existing partners already built.", "goodwill paid to old partners", "Value the firm's goodwill | The incoming partner pays their share | Old partners are credited in the sacrificing ratio", "stack"],
      ]],
      ["Financial statements", [
        ["Trading and profit and loss", "Gross profit comes from trading, net profit after every other expense.", "gross profit − expenses = net profit", "Sales less cost of goods gives gross profit | Deduct salaries, rent and the rest | What remains is net profit", "bar"],
        ["Ratio analysis", "A ratio only means something against last year or against another firm.", "compare, never read alone", "Compute the current ratio | Compare it with last year | Ask what changed, not whether the number is good", "grid"],
      ]],
    ],
    commerce: [
      ["Principles of management", [
        ["Fayol's principles", "Fourteen general principles meant to be applied with judgement, not as fixed rules.", "flexible, general guidelines", "Take unity of command | One employee, one boss | Applying it removes conflicting orders", "stack"],
        ["Functions of management", "Planning, organising, staffing, directing and controlling form one continuous cycle.", "plan, organise, staff, direct, control", "Plan the target | Organise people and resources | Control by comparing results with the plan", "cycle"],
      ]],
      ["Marketing", [
        ["The marketing mix", "Product, price, place and promotion have to agree with each other.", "the four Ps", "A premium product needs a premium price | And a matching channel | A mismatch confuses the buyer", "grid"],
        ["Consumer protection", "The law gives buyers rights and a forum in which to enforce them.", "right to be informed, heard, redressed", "A defective good is sold | The buyer complains to the forum | Redress is ordered under the Act", "cycle"],
      ]],
    ],
    economics: [
      ["National income", [
        ["GDP and GNP", "One counts output inside the country, the other counts output by its residents.", "GNP = GDP + net factor income from abroad", "Start with GDP | Add what residents earn abroad | Subtract what foreigners earn here", "bar"],
        ["Methods of measurement", "Output, income and expenditure are three routes to the same total.", "output = income = expenditure", "Add the value added by every firm | Or add all incomes earned | Both must give the same total", "cycle"],
      ]],
      ["Money and banking", [
        ["Functions of money", "Money works as a medium of exchange, a measure of value and a store of value.", "exchange, measure, store", "Barter needs a double coincidence of wants | Money removes that need | It also lets value be stored", "stack"],
        ["Credit creation", "Banks lend most of what they take in, so each deposit multiplies through the system.", "multiplier = 1 / reserve ratio", "A bank holds 10% as reserves | It lends the other 90% | That loan returns as a deposit elsewhere", "cycle"],
      ]],
    ],
    busmaths: [
      ["Linear programming", [
        ["Formulating the problem", "Name the variables, write the objective, then write every constraint as an inequality.", "maximise or minimise, subject to constraints", "Let x and y be the units made | Write profit as the objective | Turn each limit into an inequality", "stack"],
        ["Graphical solution", "The optimum of a linear programme always sits at a corner of the feasible region.", "check the corner points", "Plot every constraint | Shade the feasible region | Evaluate the objective at each corner", "grid"],
      ]],
      ["Probability distributions", [
        ["Binomial distribution", "Used when a fixed number of independent trials each succeed or fail.", "P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ", "Toss a fair coin 5 times | n = 5, p = 0.5 | For exactly 3 heads, use ⁵C₃ (0.5)⁵", "bar"],
        ["Normal distribution", "A symmetric bell curve where position is measured in standard deviations from the mean.", "z = (x − μ) / σ", "Mean 50, standard deviation 10 | A score of 70 is 2 above the mean | So z = 2", "bar"],
      ]],
    ],
  },
};
