const override = (question, answer, explanation) => ({ question, answer, explanation });

export const aptitudeShortcutOverrides = {
  apt_short_1783346228928_151: override(
    'How do successive percentage changes work as a shortcut?',
    'Multiply the percentage multipliers: increase by r% -> (1 + r/100); decrease by r% -> (1 - r/100).',
    'Rule:\nUse the current value as the base for each change.\n\nExample:\nA 20% discount followed by a 10% discount gives 100 x 0.80 x 0.90 = 72, so the total discount is 28%, not 30%.\n\nBoundary:\nThe shortcut assumes each percentage is applied sequentially to the updated value.'
  ),
  apt_short_1783346228928_152: override(
    'How can you multiply a two-digit number by 11 mentally?',
    'Insert the sum of the two digits between them, carrying when the sum is 10 or more.',
    'Example:\n45 x 11 -> 4, (4 + 5), 5 -> 495.\nFor 75 x 11, 7 + 5 = 12: write 2 in the middle and carry 1 to the 7 -> 825.\n\nBoundary:\nThis form is for two-digit numbers; use place-value multiplication for longer numbers.'
  ),
  apt_short_1783346228929_153: override(
    'How do you square a number ending in 5?',
    'If the number is 10n + 5, calculate n(n + 1) and append 25.',
    'Example:\n65^2: n = 6, so 6 x 7 = 42; append 25 -> 4,225.\n105^2: n = 10, so 10 x 11 = 110; append 25 -> 11,025.\n\nBoundary:\nThe n is the full number before the final 5, not only the first digit.'
  ),
  apt_short_1783346228929_154: override(
    'What is the two-worker time-and-work shortcut?',
    'If two workers take x and y days for the same job, their joint time is xy/(x + y) days.',
    'Example:\nA takes 10 days and B takes 15 days: joint time = 10 x 15 / 25 = 6 days.\n\nBoundary:\nIt assumes both workers do the same total job and work continuously at constant rates. For three or more workers, add rates 1/x + 1/y + 1/z.'
  ),
  apt_short_1783346228929_155: override(
    'How does alligation find a mixture ratio?',
    'For low value L, high value H, and target T between them, low:high = (H - T):(T - L).',
    'Example:\nMix 20/kg and 30/kg to get 24/kg: low:high = (30 - 24):(24 - 20) = 6:4 = 3:2.\n\nBoundary:\nThe target must lie between the two component values, and both quantities must use the same units.'
  ),
  apt_short_1783346228929_156: override(
    'What is the two-year compound-interest minus simple-interest shortcut?',
    'For exactly two years with annual compounding, CI - SI = P x (R/100)^2.',
    'Example:\nP = 1,000 and R = 5%: difference = 1,000 x 0.05^2 = 2.50.\n\nBoundary:\nThis shortcut is only for two years and the stated compounding convention. For other tenors, calculate the two accumulation values or use the general formula.'
  ),
  apt_short_1783346228929_157: override(
    'What is the Rule of 72?',
    'Approximate doubling time in years = 72 / annual percentage return.',
    'Example:\nAt 8% annual compounding, doubling time is approximately 72/8 = 9 years.\n\nBoundary:\nIt is an approximation for moderate rates, not an exact valuation formula. Use logarithms or full compounding for precise work.'
  ),
  apt_short_1783346228929_158: override(
    'What are the fastest common divisibility checks?',
    'For 3 or 9, use the digit sum; for 2 or 5, inspect the last digit; for 4, inspect the last two digits; for 8, inspect the last three digits; for 11, take the alternating digit sum.',
    'Examples:\n4,563 has digit sum 18, so it is divisible by both 3 and 9.\n3,216 is divisible by 8 because 216 is divisible by 8.\n2,398 is divisible by 11 because (2 - 3 + 9 - 8) = 0.\n\nBoundary:\nThese tests establish divisibility, not the quotient.'
  ),
  apt_short_1783346228929_159: override(
    'How do you calculate relative speed?',
    'Add speeds in opposite directions; subtract speeds in the same direction.',
    'Example:\nTwo trains at 45 km/h and 55 km/h approach each other: relative speed = 100 km/h. A 72 km/h vehicle chasing a 54 km/h vehicle has relative speed 18 km/h.\n\nBoundary:\nUse consistent units. Convert km/h to m/s with x 5/18 when distance is in metres and time is in seconds.'
  ),
  apt_short_1783346228929_160: override(
    'How does the difference-of-squares trick simplify mental multiplication?',
    'Use a^2 - b^2 = (a - b)(a + b) when the factors are equally spaced around a convenient number.',
    'Example:\n43 x 37 = (40 + 3)(40 - 3) = 40^2 - 3^2 = 1,591.\n\nBoundary:\nChoose a midpoint that makes the square easy; otherwise ordinary multiplication may be faster.'
  ),
  apt_short_1783346228929_161: override(
    'How does the odd-days shortcut find a weekday shift?',
    'An ordinary year shifts the same date by one weekday; a leap year shifts it by two only when the interval crosses February 29.',
    'Example:\nThe same date one year later shifts by +1 after an ordinary year. If the date interval includes February 29 in a leap year, the shift is +2.\n\nBoundary:\nA century year is a leap year only if divisible by 400: 2000 is, 1900 is not.'
  ),
  apt_short_1783346228929_162: override(
    'How can you multiply quickly by 5, 25, or 125?',
    'Use 5 = 10/2, 25 = 100/4, and 125 = 1,000/8.',
    'Examples:\n64 x 5 = 640/2 = 320.\n64 x 25 = 6,400/4 = 1,600.\n64 x 125 = 64,000/8 = 8,000.\n\nBoundary:\nThe divide-after-scaling method works for any number; keep place values exact.'
  ),
  apt_short_1783346228929_163: override(
    'How do you calculate common percentages mentally?',
    '10% is one decimal shift; 1% is two shifts; build 5%, 15%, or 12.5% from halves and quarters.',
    'Example:\n10% of 45.60 is 4.56, 5% is 2.28, so 15% is 6.84.\n\nBoundary:\nAlways apply the percentage to the correct base, especially after a prior discount or increase.'
  ),
  apt_short_1783346228929_164: override(
    'How does the base-100 percentage shortcut work?',
    'Set the original value to 100, apply each change in order, and compare the final value with 100.',
    'Example:\nIncrease 20%, then decrease 20%: 100 -> 120 -> 96, so the net change is a 4% decrease.\n\nBoundary:\nUse this for percentage-only questions; for monetary answers, scale the percentage result back to the actual base.'
  ),
  apt_short_1783346228929_165: override(
    'When can you use the HCF-LCM product rule?',
    'For two positive integers a and b, HCF(a,b) x LCM(a,b) = a x b.',
    'Example:\nHCF = 5, LCM = 30, and a = 10: b = (5 x 30)/10 = 15.\n\nBoundary:\nThe product rule is for two integers; it does not extend unchanged to three numbers.'
  ),
  apt_short_1783346228929_166: override(
    'How does the constant-expenditure price-change shortcut work?',
    'If price rises by r%, consumption must fall by r/(100+r) x 100% to keep spending constant.',
    'Example:\nA 25% price rise requires a consumption reduction of 25/125 = 20%.\n\nBoundary:\nThis assumes spending is fixed and the quantity change is the only adjustment.'
  ),
  apt_short_1783346228929_167: override(
    'How do you find the smaller angle between clock hands?',
    'Raw angle = |30H - 5.5M|; smaller angle = min(raw angle, 360 - raw angle).',
    'Example:\nAt 3:15, raw angle = |90 - 82.5| = 7.5 degrees. If the raw result exceeds 180, use its 360-degree complement.\n\nBoundary:\nUse H modulo 12 and include the minute hand\'s movement through 5.5M.'
  ),
  apt_short_1783346228929_168: override(
    'How do you calculate profit from a false weight?',
    'If the customer pays for standard quantity Q but receives q, profit percentage = (Q - q)/q x 100 when selling at the standard cost per Q.',
    'Example:\nCharge for 1,000g but deliver 900g at the cost of 1,000g: profit = 100/900 = 11.11% on the actual cost of goods delivered.\n\nBoundary:\nState what the customer pays and what quantity is delivered; the denominator changes if the selling price or cost convention changes.'
  ),
  apt_short_1783346228929_169: override(
    'How does the efficiency-time inverse rule work?',
    'For the same job, efficiency and time are inversely proportional: if A is k times as efficient as B, A takes 1/k of B\'s time.',
    'Example:\nIf B takes 30 days and A is three times as efficient, A takes 10 days.\n\nBoundary:\nThis assumes the same task, continuous work, and comparable working hours.'
  ),
  apt_short_1783346228929_170: override(
    'How many handshakes occur when n people each shake hands once?',
    'Total handshakes = n(n - 1)/2 = nC2.',
    'Example:\nFor 10 people, choose any two participants: 10 x 9 / 2 = 45 handshakes.\n\nBoundary:\nAssume no self-handshakes and no repeated pair. The same combination logic applies to selecting any two people.'
  ),
};
