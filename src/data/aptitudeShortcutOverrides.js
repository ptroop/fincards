import { getAptitudeShortcutStructure } from './aptitudeShortcutStructure.js';

const sourceUrl = 'https://discuss.boardinfinity.com/t/oxane-partners-senior-analyst-interview-questions-experience-guide/23465';

const override = (shortcutTopic, question, answer, explanation, formula) => ({
  shortcut_topic: shortcutTopic,
  question,
  answer,
  explanation,
  formula,
  difficulty: 'Medium',
  source: 'Academic shortcut synthesized from publicly reported Oxane assessment topics',
  source_url: sourceUrl,
  provenance: 'academic shortcut reference',
  evidence_confidence: 'high',
  evidence_note: 'A reusable method card covering an assessed topic; not a claim about exact prior wording.',
  tags: ['Oxane Partners', 'Assessment aligned', 'academic shortcut reference', 'Shortcuts'],
  ...getAptitudeShortcutStructure(shortcutTopic),
});

export const aptitudeShortcutOverrides = {
  apt_short_1783346228928_151: override(
    'percentages-successive-change',
    'How do successive percentage changes, reversals, and constant-expenditure questions fit into one method?',
    'Convert every change into a multiplier. An r% rise uses 1+r/100; an r% fall uses 1-r/100. To reverse a fall, divide by the remaining multiplier; for fixed expenditure, quantity changes inversely to price.',
    'Worked examples:\n1) +20% then -10% gives 1.20x0.90=1.08, an 8% net rise.\n2) After a 20% fall, recovery requires 1/0.80-1=25%.\n3) If price rises 25%, fixed spending requires quantity to become 1/1.25=80%, a 20% fall.\n\nUse when:\nPercentages apply to changing bases.\n\nTrap:\nAdd percentage-point changes only when the underlying denominator is the same; sequential percentage changes must be multiplied.',
    'Final/Initial = Π(1 ± rᵢ); reversal = 1/multiplier - 1'
  ),
  apt_short_1783346228928_152: override(
    'ratios-proportion-variation',
    'What is the complete shortcut for ratios, direct variation, and inverse variation?',
    'Reduce ratios to common units, convert total into parts, and identify whether variables move directly (y=kx) or inversely (xy=k) before scaling.',
    'Worked examples:\nA:B=3:5 and total=640 gives one part 640/8=80, so A=240 and B=400. If 12 workers take 15 days, the same work at constant productivity requires 18 workers for 12x15/18=10 days.\n\nUse when:\nThe question compares shares, rates, workers, speed, or dimensions.\n\nTrap:\nA ratio has no meaning until units and the relevant base are aligned. Do not apply direct proportion to time-versus-efficiency questions.',
    'Direct: y₁/y₂=x₁/x₂; inverse: x₁y₁=x₂y₂'
  ),
  apt_short_1783346228929_153: override(
    'averages-weighted-replacement',
    'How do you solve combined-average, weighted-average, and replacement questions without rebuilding the full table?',
    'Work through totals: total=value x count. Combined mean is total combined value divided by combined count; a replacement changes the mean by (new-old)/count.',
    'Worked examples:\n20 observations average 50 and 30 average 60: combined mean=(1,000+1,800)/50=56. Replacing 70 with 90 among five observations raises the mean by 20/5=4.\n\nUse when:\nGroups have different sizes or one observation is corrected.\n\nTrap:\nNever average group averages unless group counts are equal; for portfolio prices or rates, use the economically relevant exposure weight.',
    'Weighted mean = Σwᵢxᵢ/Σwᵢ; Δmean=(new-old)/n'
  ),
  apt_short_1783346228929_154: override(
    'profit-markup-margin-discount',
    'How do cost, markup, discount, profit percentage, and margin relate?',
    'Markup and profit percentage normally use cost as the base; margin uses selling price. Apply markup and discount as sequential multipliers, then divide profit by the base requested.',
    'Worked example:\nCost=100, markup=30%, discount=10% gives selling price=100x1.30x0.90=117. Profit is 17, so profit on cost is 17% but margin on sales is 17/117=14.53%.\n\nUse when:\nA question mixes marked price, selling price, and margin.\n\nTrap:\n“25% markup” does not equal “25% margin.” State the denominator explicitly.',
    'SP=CP(1+markup)(1-discount); margin=(SP-CP)/SP'
  ),
  apt_short_1783346228929_155: override(
    'interest-compounding-rule72',
    'What compact framework covers simple interest, compound interest, effective annual rate, and the Rule of 72?',
    'SI=Prt; compound value=P(1+r/m)^(mn); EAR=(1+r_nom/m)^m-1. Rule of 72 gives a rough doubling time of 72 divided by the annual percentage rate.',
    'Worked example:\nA 12% nominal rate compounded quarterly has EAR=(1.03)^4-1=12.55%. At 8%, Rule of 72 estimates nine years to double.\n\nUse when:\nComparing quoted rates or solving accumulation questions.\n\nTrap:\nMatch the rate to compounding periods. Rule of 72 is approximate; use logarithms for an exact doubling time.',
    'A=P(1+r/m)^(mn); EAR=(1+r/m)^m-1'
  ),
  apt_short_1783346228929_156: override(
    'divisibility-remainders-unit-digits',
    'How do divisibility tests, modular remainders, and unit-digit cycles work together?',
    'Use digit tests for common divisors, reduce large expressions modulo the divisor, and reduce power exponents by the repeating unit-digit cycle.',
    'Worked examples:\n4,563 has digit sum 18, so it is divisible by 9. Powers of 7 end 7,9,3,1; since 23 mod 4=3, 7^23 ends in 3. For divisor 11, use the alternating digit sum.\n\nUse when:\nOnly divisibility, remainder, or the final digit is required.\n\nTrap:\nA zero remainder in the exponent cycle means use the final cycle position, not position zero.',
    'a = qd+r, 0≤r<d; powers repeat modulo 10'
  ),
  apt_short_1783346228929_157: override(
    'hcf-lcm-factorization',
    'What is the fastest reliable HCF-LCM method?',
    'Prime-factorize when needed; HCF uses minimum exponents and LCM uses maximum exponents. For exactly two positive integers, their product equals HCF x LCM.',
    'Worked example:\nHCF=12, LCM=720, and one number=144 gives the other=(12x720)/144=60. Prime factors confirm 144=2^4x3^2 and 60=2^2x3x5.\n\nUse when:\nFinding cycle alignment, package sizes, or a missing integer.\n\nTrap:\nThe simple product identity does not extend unchanged to three or more integers.',
    'For two positive integers: ab=HCF(a,b)xLCM(a,b)'
  ),
  apt_short_1783346228929_158: override(
    'speed-units-relative-motion',
    'What is the base method for speed conversions and relative motion?',
    'Use distance=speedxtime; convert km/h to m/s with x5/18. Add speeds when objects close in opposite directions and subtract when one chases another in the same direction.',
    'Worked example:\nTwo trains at 36 and 54 km/h approach each other: relative speed=90x5/18=25 m/s. If their total length is 300 m, crossing time=300/25=12 seconds.\n\nUse when:\nTrains, vehicles, or people move relative to one another.\n\nTrap:\nRelative speed changes the closing rate, not the physical length to be cleared.',
    'v_rel=v₁+v₂ opposite; |v₁-v₂| same direction'
  ),
  apt_short_1783346228929_159: override(
    'average-speed',
    'When is average speed the harmonic mean rather than the arithmetic mean?',
    'Always calculate total distance divided by total time. For two equal distances at speeds a and b, this simplifies to 2ab/(a+b); for equal times, the arithmetic mean applies.',
    'Worked example:\n120 km out at 60 and 120 km back at 40 takes 2+3=5 hours, so average speed=240/5=48 km/h.\n\nUse when:\nA journey has segments at different speeds.\n\nTrap:\nDo not average speeds directly unless the time spent at each speed is equal.',
    'Average speed = total distance/total time; equal distances = 2ab/(a+b)'
  ),
  apt_short_1783346228929_160: override(
    'trains-boats-streams',
    'What formulas cover train crossings and boats in streams?',
    'For trains, distance cleared equals the sum of relevant lengths and speed is relative speed. For boats, downstream=b+s and upstream=b-s, where b is still-water speed and s is stream speed.',
    'Worked example:\nA 180 m train passing a 120 m train in the opposite direction at 54 and 36 km/h clears 300 m at 25 m/s in 12 seconds. A boat at 15 km/h with a 3 km/h stream moves 18 downstream and 12 upstream.\n\nUse when:\nObjects have length or water contributes its own velocity.\n\nTrap:\nA pole has zero length; a platform does not. Average upstream/downstream speed is not generally the still-water speed.',
    'Crossing time=(L₁+L₂)/v_rel; v_down=b+s; v_up=b-s'
  ),
  apt_short_1783346228929_161: override(
    'time-work-efficiency',
    'What is the complete rate method for time-and-work questions?',
    'Represent one job as 1 or an LCM of days. A worker taking d days has rate 1/d; add simultaneous rates, subtract destructive rates, and invert the final rate.',
    'Worked example:\nA takes 12 days and B 18 days. Their joint rate is 1/12+1/18=5/36, so joint time=36/5=7.2 days. If A works three days first, calculate completed work before changing the team.\n\nUse when:\nWorkers join, leave, alternate, or differ in efficiency.\n\nTrap:\nTimes do not add; rates do. Productivity must be constant for the shortcut to hold.',
    'Joint time = 1/(Σ rates); for two workers = xy/(x+y)'
  ),
  apt_short_1783346228929_162: override(
    'pipes-cisterns',
    'How do filling pipes, leaks, and changing tank levels reduce to one equation?',
    'Treat inlets as positive work rates and outlets or leaks as negative rates. Sum active rates for each time interval, then calculate the remaining fraction.',
    'Worked example:\nAn inlet fills in 6 hours and a leak empties in 18. Net rate=1/6-1/18=1/9, so the empty tank fills in nine hours.\n\nUse when:\nThe set of open pipes changes over time.\n\nTrap:\nIf a leak starts after the tank is partly full, calculate the first interval separately; do not apply one net rate to the whole period.',
    'Net rate = Σ inlet rates - Σ outlet rates'
  ),
  apt_short_1783346228929_163: override(
    'mixtures-alligation',
    'How does alligation solve two-component mixture questions, and when should you use weighted averages instead?',
    'For low L, high H, and target T between them, low:high=(H-T):(T-L). For more than two components or unequal units, write the full weighted-average equation.',
    'Worked example:\nMix 20% and 50% solutions for 30%: low:high=(50-30):(30-20)=20:10=2:1.\n\nUse when:\nTwo components combine linearly by concentration, price, or return.\n\nTrap:\nThe target must lie between L and H, percentages must use the same base, and chemical volume contraction would invalidate a simple linear mixture assumption.',
    'Low:High = (H-T):(T-L)'
  ),
  apt_short_1783346228929_164: override(
    'ages',
    'What is the reliable shortcut for present, past, and future age equations?',
    'Assign present ages first. Add the same number of years to every living person for a future date and subtract the same number for a past date; age differences remain constant.',
    'Worked example:\nFive years from now A is twice B, and present ages total 50: A+B=50 and A+5=2(B+5), giving A=35 and B=15.\n\nUse when:\nA ratio changes across dates.\n\nTrap:\nThe age ratio changes over time, but the absolute age difference does not.',
    'Future age = present age + t; age difference is invariant'
  ),
  apt_short_1783346228929_165: override(
    'partnership-capital-time',
    'How are partnership profits divided when capital changes over time?',
    'Weight each partner’s capital by the time it remains invested, sum separate intervals when capital changes, and divide profit in the resulting capital-time ratio.',
    'Worked example:\n₹60,000 for eight months and ₹40,000 for twelve months both contribute ₹480,000-months, so profit is split 1:1.\n\nUse when:\nPartners enter, withdraw, or change capital during the year.\n\nTrap:\nSalary, interest on capital, or special partnership terms must be handled before dividing residual profit if the question states them.',
    'Profit share ratio = Σ(capital x time) by partner'
  ),
  apt_short_1783346228929_166: override(
    'probability-complement-inclusion',
    'When is the complement or inclusion-exclusion shortcut fastest in probability?',
    'Use P(at least one)=1-P(none). For overlapping events, P(A∪B)=P(A)+P(B)-P(A∩B). Multiply only when events are independent or conditional probabilities are used correctly.',
    'Worked example:\nThree fair tosses have P(at least one head)=1-(1/2)^3=7/8. If P(A)=0.4, P(B)=0.5, and independent, P(A∪B)=0.4+0.5-0.2=0.7.\n\nUse when:\nDirect enumeration has many successful cases.\n\nTrap:\n“Mutually exclusive” and “independent” are different: non-zero mutually exclusive events cannot be independent.',
    'P(A∪B)=P(A)+P(B)-P(A∩B)'
  ),
  apt_short_1783346228929_167: override(
    'conditional-probability-bayes',
    'How do conditional probability and Bayes’ theorem prevent base-rate errors?',
    'P(A|B)=P(A∩B)/P(B). Bayes reverses the condition: P(A|B)=P(B|A)P(A)/P(B), where P(B) includes every way B can occur.',
    'Worked example:\nDefault prior 3%, warning sensitivity 80%, false-positive rate 5% gives posterior=0.03x0.80/[0.03x0.80+0.97x0.05]=33.1%.\n\nUse when:\nA test, warning, or filter changes the relevant population.\n\nTrap:\nP(warning|default) is not P(default|warning); the base rate can dominate a seemingly accurate signal.',
    'P(A|B)=P(B|A)P(A)/[P(B|A)P(A)+P(B|not A)P(not A)]'
  ),
  apt_short_1783346228929_168: override(
    'permutations-combinations',
    'How do you decide between permutations, combinations, and circular arrangements?',
    'Use nCr when order does not matter, nPr when roles or sequence matter, and (n-1)! for distinct circular arrangements. Treat required-together items as a block.',
    'Worked example:\nChoose two reviewers from ten: 10C2=45. Assign lead and checker: 10P2=90. Seat six people in a circle: 5!=120.\n\nUse when:\nSelecting committees, assigning roles, or seating people.\n\nTrap:\nAccount for repeated objects, forbidden adjacency, and internal block order; circular arrangements remove rotation, not reflection unless stated.',
    'nCr=n!/[r!(n-r)!]; nPr=n!/(n-r)!'
  ),
  apt_short_1783346228929_169: override(
    'expected-value',
    'What does expected value calculate, and what does it leave out?',
    'Expected value is Σ(probability x outcome). It measures the probability-weighted long-run average, not certainty, dispersion, downside severity, or utility.',
    'Worked example:\nA 60% chance of +100 and 40% chance of -50 gives EV=60-20=40. Another gamble with the same EV can have far greater variance and tail loss.\n\nUse when:\nComparing lotteries, credit losses, or scenario-weighted payoffs.\n\nTrap:\nInclude negative outcomes with negative signs and check probabilities sum to one.',
    'E[X] = Σpᵢxᵢ'
  ),
  apt_short_1783346228929_170: override(
    'statistics-core',
    'Which basic-statistics formulas and interpretations matter most in an assessment?',
    'Know mean, median, weighted mean, variance, standard deviation, z-score, coefficient of variation, percentile, covariance, and correlation—and when each is appropriate.',
    'Worked example:\nWith mean 50 and standard deviation 10, observation 70 has z=2. If two portfolios have different means, CV=standard deviation/mean compares relative dispersion, provided the mean is meaningful and non-zero.\n\nUse when:\nSummarising returns, defaults, or operational data.\n\nTrap:\nThe mean is outlier-sensitive; correlation is not causation; a z-score does not prove normality; sample and population variance use different denominators.',
    'z=(x-μ)/σ; CV=σ/μ; Corr(X,Y)=Cov(X,Y)/(σXσY)'
  ),
};
