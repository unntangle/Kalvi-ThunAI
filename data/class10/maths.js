// Class 10 Maths — Samacheer Kalvi (2018 revision).
// 8 chapters, with the sub-topics the textbook itself lists inside each.
//
// Shape: [ [chapterTitle, [
//   [concept, summary, keyLine, "step | step | step", avType, youtubeId?, extra?]
// ] ] ]
//
// extra is an optional object carrying the longer theory shown on the concept page:
//   figures  keys into components/phone/Figure.jsx. The first is shown inline on
//            the concept page; the Photos tab of the player shows them all.
//   images   optional curated photographs, [{ src, caption, credit }].
//   deeper   a paragraph that goes past the one-line summary
//   mistake  the error this concept actually produces in exams
//   tryIt    one question the student answers themselves
//   work     a full worked sum for the Steps tab

export const maths = [
  ["Relations and Functions", [
    ["Ordered pair", "In an ordered pair the position of each element is part of the pair, not just its value.", "(a, b) = (c, d) only if a = c and b = d", "Compare (2, 5) and (5, 2) | The same two numbers appear in both | The order differs, so the pairs differ", "stack"],

    ["Cartesian product", "Pairing every element of one set with every element of another builds the product set.", "n(A × B) = n(A) × n(B)", "A has 3 elements, B has 4 | Every a pairs with every b | A × B holds 12 ordered pairs", "grid", "-fGJVEDLnn8", {
      figures: ["cartesian-grid", "cartesian-tree"],
      deeper: "The order inside a pair is part of the pair. (1, 2) and (2, 1) are different elements, so A × B and B × A are different sets unless A and B are the same. This is also where the rest of the chapter comes from: a relation is any subset of A × B, and a function is a subset with one extra condition on it.",
      mistake: "Treating A × B and B × A as the same set. They are the same size, but not the same elements.",
      tryIt: "A = {a, b} and B = {1, 2, 3}. Write out A × B in full, then say how many elements B × A has.",
      work: {
        question: "A = {a, b, c} and B = {1, 2}. Find A × B and n(A × B).",
        lines: [
          ["A = {a, b, c}   B = {1, 2}", "Write both sets down before pairing anything."],
          ["n(A) = 3,   n(B) = 2", "Count the elements in each set."],
          ["A × B = {(a,1), (a,2), (b,1), (b,2), (c,1), (c,2)}", "Take each element of A in turn and pair it with every element of B."],
          ["n(A × B) = 3 × 2 = 6", "Six pairs, which is n(A) × n(B) exactly as the rule says."],
        ],
      },
    }],

    ["Relations", "A relation is any subset of A × B, so it is a rule that selects some of the pairs and ignores the rest.", "R ⊆ A × B", "Write out A × B in full | Keep only the pairs that obey your rule | What is left is the relation R", "grid"],

    ["Domain, co-domain and range", "Three different sets describe a relation, and the range is usually smaller than the co-domain.", "range ⊆ co-domain", "Collect the first elements to get the domain | B as a whole is the co-domain | Collect the second elements actually used to get the range", "stack"],

    ["When a relation is a function", "Every input must have exactly one output, or the relation is not a function.", "one input, one output", "Take {(1,2), (1,3)} | The input 1 gives two outputs | So it is a relation but not a function", "grid", "_dgvDBcknnY", {
      figures: ["function-map", "vertical-line-test"],
      deeper: "The vertical line test is this same rule drawn rather than written: if any vertical line meets the graph twice, one input has two outputs and the relation fails. Notice what the rule does not say. Two different inputs are allowed to share one output, and the relation is still a function.",
      mistake: "Rejecting a relation because two inputs give the same output. That is permitted. Only one input giving two outputs breaks it.",
      tryIt: "Is {(1,4), (2,4), (3,4)} a function? Is {(4,1), (4,2), (4,3)}? Say why for each.",
      work: {
        question: "Is R = {(1, 4), (2, 5), (2, 6)} a function?",
        lines: [
          ["R = {(1, 4), (2, 5), (2, 6)}", "List the pairs and look only at the first number in each."],
          ["First elements: 1, 2, 2", "The input 2 appears twice, so check what it maps to."],
          ["2 → 5   and   2 → 6", "One input is giving two different outputs."],
          ["R is a relation, not a function", "A function allows each input exactly one output."],
        ],
      },
    }],

    ["Representing a function", "The same function can be written four ways, and an exam may hand you any one of them.", "set of pairs · table · arrow diagram · graph", "Start from the set of ordered pairs | Lay the same pairs out as a table | Draw them as arrows, then as points on a graph", "map"],

    ["Types of functions", "One-one, many-one, onto and into describe how the inputs land on the outputs.", "one-one · many-one · onto · into", "Check whether two inputs share an output | If never, the function is one-one | If every element of the co-domain is used, it is onto", "cycle"],

    ["Identity and constant functions", "Two special cases worth recognising on sight, because their graphs are fixed.", "f(x) = x · f(x) = k", "f(x) = x returns whatever it is given | Its graph is the line y = x | f(x) = k ignores the input and gives a horizontal line", "bar"],

    ["Composition of functions", "Apply the inner function first, then feed its result into the outer one.", "(f ∘ g)(x) = f(g(x))", "f(x) = 2x, g(x) = x + 3 | g(1) = 4 | f(4) = 8, so (f ∘ g)(1) = 8", "bar", "NAKQ336ycgE", {
      figures: ["function-machine", "composition-order"],
      deeper: "Composition is not commutative, so f ∘ g and g ∘ f are usually different functions and the order is part of the answer. Read f ∘ g from the right, which is what the brackets in f(g(x)) already tell you to do. For the composition to exist at all, every output of g has to be something f is allowed to accept.",
      mistake: "Reading left to right and applying f first. The inner function always runs first.",
      tryIt: "With the same f and g, find (g ∘ f)(1) and compare it with the 8 you got for (f ∘ g)(1).",
      work: {
        question: "f(x) = 2x and g(x) = x + 3. Find (f ∘ g)(1).",
        lines: [
          ["(f ∘ g)(1) = f(g(1))", "Rewrite it using the definition. The inner function g runs first."],
          ["g(1) = 1 + 3 = 4", "Work out the inside bracket on its own."],
          ["f(4) = 2 × 4 = 8", "Feed that answer into f."],
          ["(f ∘ g)(1) = 8", "State the answer."],
        ],
      },
    }],

    ["Identifying graphs", "The highest power in the rule decides the shape of the curve before you plot a single point.", "linear · quadratic · cubic · reciprocal", "Look at the highest power of x | Power 1 gives a straight line | Power 2 gives a parabola, power 3 an S-shaped curve", "map"],
  ]],

  ["Numbers and Sequences", [
    ["Euclid's division lemma", "Any division can be written as one exact statement, and that statement drives the HCF algorithm.", "a = bq + r, 0 ≤ r < b", "Divide 273 by 119 | 273 = 119 × 2 + 35 | Repeat with 119 and 35 until the remainder is 0", "stack", "GIi7a2WaTBI", {
      figures: ["euclid-lemma", "euclid-ladder"],
      deeper: "The force of the lemma is in the condition on r. Because the remainder is strictly smaller than the divisor, repeating the step drives it down to zero in a finite number of rounds. The last non-zero remainder is the HCF. Euclid's algorithm is nothing more than this one lemma applied again and again.",
      mistake: "Letting r equal b. The condition is 0 ≤ r < b, so a remainder as large as the divisor means the quotient was taken too small.",
      tryIt: "Apply the lemma repeatedly to find the HCF of 867 and 255.",
      work: {
        question: "Find the HCF of 273 and 119 using Euclid's division lemma.",
        lines: [
          ["273 = 119 × 2 + 35", "Divide the larger by the smaller. The remainder is 35."],
          ["119 = 35 × 3 + 14", "Now the old divisor becomes the new dividend."],
          ["35 = 14 × 2 + 7", "Repeat with 35 and 14. The remainder keeps shrinking."],
          ["14 = 7 × 2 + 0", "The remainder is 0, so the process stops here."],
          ["HCF (273, 119) = 7", "The last non-zero remainder is the HCF."],
        ],
      },
    }],

    ["Euclid's division algorithm", "Repeating the lemma until the remainder is zero finds the HCF of any two numbers.", "last non-zero remainder = HCF", "Apply the lemma to the two numbers | Feed divisor and remainder back in | Stop at remainder 0 and read the previous remainder", "stack"],

    ["Fundamental theorem of arithmetic", "Every whole number above 1 breaks into primes in exactly one way, apart from the order.", "unique prime factorisation", "Factorise 60 as 2 × 2 × 3 × 5 | Try any other route and the same primes appear | Only the order can change", "grid"],

    ["Modular arithmetic", "Two numbers are congruent when they leave the same remainder on division by the modulus.", "a ≡ b (mod n)", "Divide 17 by 5 to get remainder 2 | Divide 32 by 5 to get remainder 2 | So 17 ≡ 32 (mod 5)", "cycle"],

    ["Sequences", "A sequence is a list in a fixed order, and its general term is a rule for the nth item.", "aₙ is the rule for term n", "Look at 2, 4, 6, 8 | Each term is twice its position | So aₙ = 2n", "bar"],

    ["Arithmetic progression", "Each term rises by the same fixed amount, so the nth term is a straight line rule.", "aₙ = a + (n − 1)d", "a = 5, d = 3 | For the 10th term, n − 1 = 9 | 5 + 9 × 3 = 32", "bar", "DqgorwhXFAE", {
      figures: ["ap-ladder", "ap-vs-gp"],
      deeper: "Because d never changes, plotting the terms against their position gives points sitting on a straight line of slope d. That is why the nth term formula reads like the equation of a line. To test any sequence, subtract each term from the one after it; if every difference is the same number, it is an AP and that number is d.",
      mistake: "Multiplying by n instead of n − 1. The first term needs no jumps at all, so reaching the tenth takes nine.",
      tryIt: "Find the 20th term of 7, 11, 15, 19, … and then the sum of the first 20 terms.",
      work: {
        question: "Find the 10th term of 5, 8, 11, 14, …",
        lines: [
          ["a = 5", "The first term of the sequence."],
          ["d = 8 − 5 = 3", "Subtract any term from the one after it to get the common difference."],
          ["aₙ = a + (n − 1)d", "Write the formula down before putting numbers in."],
          ["a₁₀ = 5 + (10 − 1) × 3", "n = 10, so n − 1 = 9. Nine jumps, not ten."],
          ["a₁₀ = 5 + 27 = 32", "The tenth term is 32."],
        ],
      },
    }],

    ["Sum of an arithmetic series", "Pairing the first term with the last is what collapses the whole sum into one line.", "Sₙ = n/2 (a + l) = n/2 [2a + (n − 1)d]", "First 10 terms of 5, 8, 11 … last is 32 | n/2 = 5 | 5 × (5 + 32) = 185", "grid"],

    ["Geometric progression", "Each term is the previous one multiplied by a fixed ratio, so growth is multiplicative.", "aₙ = a rⁿ⁻¹", "a = 3, r = 2 | For the 5th term, r⁴ = 16 | 3 × 16 = 48", "bar", "mleAusXs2JY", {
      figures: ["gp-doubling", "ap-vs-gp"],
      deeper: "Where an AP adds the same amount each time, a GP multiplies by it, so once r is above 1 the terms climb far faster than any AP. If r sits between 0 and 1 the terms shrink towards zero instead. The test is division rather than subtraction: divide each term by the one before it, and a constant answer means a GP with that answer as r.",
      mistake: "Using rⁿ instead of rⁿ⁻¹. The first term is a × r⁰, so the exponent always runs one behind the position.",
      tryIt: "Find the 6th term of 2, 6, 18, 54, … and state r.",
      work: {
        question: "Find the 5th term of 3, 6, 12, 24, …",
        lines: [
          ["a = 3", "The first term of the sequence."],
          ["r = 6 ÷ 3 = 2", "Divide a term by the one before it. For a GP you divide, not subtract."],
          ["aₙ = a rⁿ⁻¹", "Write the formula down first."],
          ["a₅ = 3 × 2⁴", "n = 5, so the power is 4. It always runs one behind."],
          ["a₅ = 3 × 16 = 48", "The fifth term is 48."],
        ],
      },
    }],

    ["Sum of a geometric series", "Which form of the formula you use depends only on whether r is above or below 1.", "Sₙ = a(rⁿ − 1)/(r − 1), r ≠ 1", "a = 3, r = 2, n = 5 | rⁿ = 32, so rⁿ − 1 = 31 | 3 × 31 ÷ 1 = 93", "grid"],

    ["Special series", "Three standard sums appear often enough that they are worth knowing by heart.", "Σn = n(n+1)/2 · Σn² = n(n+1)(2n+1)/6 · Σn³ = [n(n+1)/2]²", "Add 1 to 100 | Use n(n+1)/2 with n = 100 | 100 × 101 ÷ 2 = 5050", "bar"],
  ]],

  ["Algebra", [
    ["Equations in three variables", "Eliminate one variable at a time until a single equation in one unknown is left.", "eliminate, substitute, back-substitute", "Add two equations to remove z | Solve the pair that remains | Put the values back to find z", "stack"],

    ["GCD and LCM of polynomials", "The product of the GCD and the LCM equals the product of the two polynomials.", "GCD × LCM = p(x) × q(x)", "Factorise both polynomials | Common factors give the GCD | Divide the product by the GCD for the LCM", "grid"],

    ["Rational expressions", "A rational expression behaves like a fraction, so it is undefined wherever the denominator is zero.", "p(x)/q(x), q(x) ≠ 0", "Factorise top and bottom | Cancel only whole common factors | Note the x values that make the denominator zero", "stack"],

    ["Operations on rational expressions", "Multiply straight across, but for addition find a common denominator first.", "same denominator before adding", "Factorise every denominator | Build the least common denominator | Rewrite both fractions and then add", "grid"],

    ["Square root of a polynomial", "The long division method finds the square root of a perfect square expression term by term.", "pair the terms, then divide", "Arrange the polynomial in descending powers | Take the square root of the first term | Continue the division as with numbers", "stack"],

    ["Solving quadratics by factorisation", "Split the middle term so the expression becomes a product, then set each bracket to zero.", "if ab = 0 then a = 0 or b = 0", "x² − 5x + 6 = 0 | Split as (x − 2)(x − 3) = 0 | So x = 2 or x = 3", "grid"],

    ["The quadratic formula", "The formula solves every quadratic, including the ones that will not factorise.", "x = [−b ± √(b² − 4ac)] / 2a", "Identify a, b and c | Substitute into the formula | Work out both signs for the two roots", "bar"],

    ["Nature of quadratic roots", "The discriminant tells you what kind of roots exist before you solve anything.", "Δ = b² − 4ac", "Take x² − 4x + 4 = 0 | Δ = 16 − 16 = 0 | Zero means the roots are real and equal", "bar"],

    ["Roots and coefficients", "The sum and product of the roots can be read straight off the equation.", "α + β = −b/a · αβ = c/a", "Take 2x² − 7x + 3 = 0 | Sum of roots = 7/2 | Product of roots = 3/2", "bar"],

    ["Quadratic graphs", "The parabola opens upward when a is positive and downward when it is negative.", "roots are where the curve meets the x-axis", "Plot points either side of the vertex | Note where the curve crosses the x-axis | Those crossings are the roots", "map"],

    ["Matrices and their types", "A matrix is an arrangement of numbers in rows and columns, named by its order.", "order = rows × columns", "Count the rows, then the columns | 2 rows and 3 columns gives order 2 × 3 | Equal rows and columns make it square", "grid"],

    ["Matrix multiplication", "Row of the first times column of the second, so the inner dimensions must match.", "(m × n)(n × p) = m × p", "A is 2 × 3, B is 3 × 2 | The inner 3s match | The product has order 2 × 2", "grid"],
  ]],

  ["Geometry", [
    ["Similar triangles", "Equal angles are enough for similarity, and similarity fixes every side ratio.", "AA criterion", "Show two pairs of angles are equal | The third pair follows | The triangles are similar, so sides are proportional", "grid"],

    ["Basic proportionality theorem", "A line parallel to one side of a triangle cuts the other two sides in the same ratio.", "AD/DB = AE/EC", "Draw DE parallel to BC | The two triangles are similar | So the cut sides share one ratio", "grid"],

    ["Angle bisector theorem", "The bisector of an angle divides the opposite side in the ratio of the two adjacent sides.", "BD/DC = AB/AC", "Bisect angle A to meet BC at D | Compare the two sides at A | BD and DC fall in that same ratio", "grid"],

    ["Pythagoras theorem", "In a right triangle the square on the hypotenuse equals the sum of the other two squares.", "a² + b² = c²", "Legs are 6 cm and 8 cm | 36 + 64 = 100 | The hypotenuse is 10 cm", "grid"],

    ["Circles and tangents", "A tangent meets a circle once, and the radius drawn to that point is perpendicular to it.", "radius ⊥ tangent at the point of contact", "Draw the radius to the point of contact | Mark the right angle there | Use it to build a right triangle", "cycle"],

    ["Tangent lengths and the alternate segment", "Two tangents from one outside point are equal, and a tangent makes equal angles with the alternate segment.", "PA = PB from an external point", "Draw both tangents from the outside point | Join the centre to that point | The two triangles formed are congruent", "cycle"],

    ["Ceva's and Menelaus' theorems", "Two concurrency tests that turn a geometry question into a product of three ratios.", "Ceva: product = 1 for concurrent cevians", "Mark the three points on the sides | Write the three ratios in order | Multiply and compare with 1", "map"],
  ]],

  ["Coordinate Geometry", [
    ["Area of a triangle", "Three coordinates are enough to find an area, with no need to measure a height.", "A = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|", "Take (1,2), (4,6), (7,2) | Substitute into the formula | The area works out to 12 square units", "grid"],

    ["Collinearity", "Three points lie on one line exactly when the triangle they form has zero area.", "area = 0 means collinear", "Apply the area formula to the three points | The result comes out as 0 | No triangle exists, so the points are collinear", "bar"],

    ["Area of a quadrilateral", "The same shoelace pattern works for four vertices, provided you take them in order around the shape.", "take the vertices in cyclic order", "List the four vertices going round the shape | Apply the shoelace pattern | Halve the absolute value", "grid"],

    ["Slope of a straight line", "Slope is the rise divided by the run, and parallel lines share it.", "m = (y₂ − y₁) / (x₂ − x₁)", "Points (2,3) and (6,11) | Rise is 8, run is 4 | The slope is 2", "bar"],

    ["Parallel and perpendicular lines", "Parallel lines have equal slopes; perpendicular slopes multiply to −1.", "m₁ = m₂ · m₁m₂ = −1", "Find both slopes | Equal slopes mean the lines are parallel | A product of −1 means they are perpendicular", "bar"],

    ["Equation of a straight line", "Which form to use depends on what the question gives you, not on preference.", "y − y₁ = m(x − x₁)", "Note what is given: a point and slope, or two points | Pick the matching form | Substitute and simplify", "stack"],

    ["General form of a line", "Any straight line can be written as ax + by + c = 0, and its slope follows from a and b.", "slope = −a/b", "Rearrange the equation into ax + by + c = 0 | Read a and b | The slope is −a/b", "bar"],
  ]],

  ["Trigonometry", [
    ["The fundamental identity", "The identity follows straight from Pythagoras applied to a unit circle.", "sin²θ + cos²θ = 1", "Take sin θ = 3/5 | sin²θ = 9/25 | cos²θ = 16/25, so cos θ = 4/5", "cycle"],

    ["The other two identities", "Dividing the first identity through by cos²θ or sin²θ produces the other two.", "1 + tan²θ = sec²θ · 1 + cot²θ = cosec²θ", "Start from sin²θ + cos²θ = 1 | Divide every term by cos²θ | The result is 1 + tan²θ = sec²θ", "cycle"],

    ["Proving trigonometric identities", "Work on one side only and drive it towards the other; never treat it as an equation to solve.", "one side at a time", "Pick the messier side | Convert everything to sin and cos | Simplify until it matches the other side", "stack"],

    ["Angle of elevation", "Draw the right triangle first, mark the angle at the eye, then choose the ratio.", "tan θ = opposite / adjacent", "A tower is seen at 30° from 30 m away | tan 30° = h / 30 | h = 30 / √3, about 17.3 m", "grid"],

    ["Angle of depression", "Looking down, the angle is measured from the horizontal, not from the vertical.", "measured from the horizontal line of sight", "Stand on a 20 m cliff | A boat is seen 45° below the horizontal | tan 45° = 1, so the boat is 20 m out", "grid"],

    ["Problems with two observations", "Two angles from two positions give two equations, and subtracting them removes the unknown distance.", "two sightings, two equations", "Write tan for the first position | Write tan for the second | Subtract to eliminate the unknown distance", "map"],
  ]],

  ["Mensuration", [
    ["Surface area of a cylinder", "Unroll the curved surface and it becomes a rectangle, which is where 2πrh comes from.", "CSA = 2πrh · TSA = 2πr(h + r)", "r = 7 cm, h = 10 cm | CSA = 2 × 22/7 × 7 × 10 = 440 cm² | Add the two circular ends for the total", "grid"],

    ["Surface area of a cone", "Unroll the curved surface and it becomes a sector, which is where πrl comes from.", "CSA = πrl · TSA = πr(l + r)", "r = 7 cm, l = 25 cm | CSA = 22/7 × 7 × 25 = 550 cm² | Add the base πr² for the total", "grid"],

    ["Sphere and hemisphere", "A hemisphere has a flat face as well as a curved one, so its total area is three πr², not two.", "sphere 4πr² · hemisphere TSA 3πr²", "Curved surface of a hemisphere is 2πr² | The flat circle adds πr² | Together that is 3πr²", "grid"],

    ["Frustum of a cone", "Cutting the top off a cone leaves a frustum with two different radii.", "CSA = πl(R + r)", "Measure both radii and the slant height | Add the two radii | Multiply by π and the slant height", "grid"],

    ["Volume of a sphere", "A sphere holds two thirds of the cylinder that exactly encloses it.", "V = 4/3 πr³", "r = 3 cm | r³ = 27 | V = 4/3 × 22/7 × 27, about 113.1 cm³", "grid"],

    ["Combined solids", "Split the shape into standard solids, then add or subtract their volumes.", "split, compute, combine", "A cylinder capped by a hemisphere | Find each volume separately | Add them for the total", "stack"],

    ["Conversion of solids", "Melting one shape into another changes the surface area but never the volume.", "volume before = volume after", "Write the volume of the original solid | Write the volume of the new shape | Set them equal and solve", "cycle"],
  ]],

  ["Statistics and Probability", [
    ["Range and measures of dispersion", "Dispersion asks how spread out the data is, which an average alone cannot tell you.", "range = largest − smallest", "Find the largest and smallest values | Subtract to get the range | Note that range ignores everything in between", "bar"],

    ["Standard deviation", "Standard deviation measures how far a typical value sits from the mean.", "σ = √(Σd² / n)", "Find the mean of the data | Square each deviation from it | Average those squares and take the root", "bar"],

    ["Variance", "Variance is the square of the standard deviation, so it carries squared units.", "variance = σ²", "Work out the standard deviation | Square it to get the variance | Remember the units are squared too", "bar"],

    ["Coefficient of variation", "Dividing by the mean makes two data sets comparable even in different units.", "CV = (σ / x̄) × 100", "Compute σ and the mean | Divide one by the other | Multiply by 100 to get a percentage", "bar"],

    ["Probability of an event", "Probability counts favourable outcomes against all equally likely outcomes.", "P(A) = n(A) / n(S)", "List the sample space | Count the outcomes that satisfy the event | Divide one count by the other", "grid"],

    ["Addition theorem of probability", "Add the two probabilities, then take out the overlap you counted twice.", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2 | Add to get 0.9 | Subtract the overlap, leaving 0.7", "grid"],

    ["Mutually exclusive events", "Events that cannot happen together have no overlap, so the subtraction term disappears.", "P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B)", "Ask whether both events can occur at once | If not, they are mutually exclusive | Simply add the two probabilities", "cycle"],
  ]],
];
