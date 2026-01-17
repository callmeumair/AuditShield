/**
 * Risk Scoring Engine for Data Leak Prevention
 * Analyzes text for PII and sensitive information
 */

export interface RiskPattern {
    name: string;
    pattern: RegExp;
    score: number;
    description: string;
}

export interface RiskAnalysis {
    riskScore: number;
    violations: Array<{
        pattern: string;
        matches: string[];
        score: number;
    }>;
    isSafe: boolean;
}

// Built-in PII detection patterns
export const DEFAULT_PATTERNS: RiskPattern[] = [
    {
        name: 'email',
        pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        score: 30,
        description: 'Email address detected'
    },
    {
        name: 'ssn',
        pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
        score: 80,
        description: 'Social Security Number detected'
    },
    {
        name: 'credit_card',
        pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
        score: 90,
        description: 'Credit card number detected'
    },
    {
        name: 'phone',
        pattern: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
        score: 20,
        description: 'Phone number detected'
    },
    {
        name: 'ip_address',
        pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
        score: 25,
        description: 'IP address detected'
    },
    {
        name: 'api_key',
        pattern: /\b[A-Za-z0-9_-]{32,}\b/g,
        score: 70,
        description: 'Potential API key or token detected'
    },
];

/**
 * Analyze text for sensitive information and calculate risk score
 */
export function analyzeRisk(
    text: string,
    customPatterns: RiskPattern[] = []
): RiskAnalysis {
    const allPatterns = [...DEFAULT_PATTERNS, ...customPatterns];
    const violations: RiskAnalysis['violations'] = [];
    let totalScore = 0;

    for (const pattern of allPatterns) {
        const matches = text.match(pattern.pattern);
        if (matches && matches.length > 0) {
            violations.push({
                pattern: pattern.name,
                matches: matches.slice(0, 5), // Limit to first 5 matches
                score: pattern.score
            });
            // Cap individual pattern contribution
            totalScore += Math.min(pattern.score, 50);
        }
    }

    // Normalize score to 0-100 range
    const riskScore = Math.min(totalScore, 100);

    return {
        riskScore,
        violations,
        isSafe: riskScore < 30 // Threshold for "safe"
    };
}

/**
 * Check if text contains any custom keywords
 */
export function checkKeywords(text: string, keywords: string[]): boolean {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Create custom pattern from regex string
 */
export function createCustomPattern(
    name: string,
    regexString: string,
    score: number,
    description: string
): RiskPattern | null {
    try {
        const pattern = new RegExp(regexString, 'gi');
        return { name, pattern, score, description };
    } catch (error) {
        console.error('Invalid regex pattern:', error);
        return null;
    }
}
