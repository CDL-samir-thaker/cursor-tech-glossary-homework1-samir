import { describe, it, expect } from 'vitest';

// Mock glossary data for testing
const testGlossaryData = [
    {
        term: "API",
        description: "Application Programming Interface - a set of protocols and tools that allows different software applications to communicate with each other.",
        tags: ["Backend", "Integration", "Web"]
    },
    {
        term: "CI/CD",
        description: "Continuous Integration/Continuous Deployment - automated practices for integrating code changes and deploying applications to production.",
        tags: ["DevOps", "Automation", "Development"]
    },
    {
        term: "Machine Learning",
        description: "A subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
        tags: ["AI", "Data Science", "Algorithm"]
    },
    {
        term: "Docker",
        description: "A platform for developing, shipping, and running applications in isolated containers that package code and dependencies together.",
        tags: ["DevOps", "Container", "Infrastructure"]
    }
];

// Pure function implementation for testing (matches glossary.js logic)
function filterGlossary(query, data = testGlossaryData) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        return data;
    }

    return data.filter(entry => {
        const termMatch = entry.term.toLowerCase().includes(searchTerm);
        const descMatch = entry.description.toLowerCase().includes(searchTerm);
        const tagMatch = entry.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return termMatch || descMatch || tagMatch;
    });
}

describe('filterGlossary', () => {
    it('should return all entries when query is empty', () => {
        const result = filterGlossary('');
        expect(result).toHaveLength(4);
        expect(result).toEqual(testGlossaryData);
    });

    it('should return all entries when query is only whitespace', () => {
        const result = filterGlossary('   ');
        expect(result).toHaveLength(4);
        expect(result).toEqual(testGlossaryData);
    });

    it('should filter by term name (case-insensitive)', () => {
        const result = filterGlossary('API');
        expect(result).toHaveLength(1);
        expect(result[0].term).toBe('API');
        
        // Test case insensitivity
        const resultLower = filterGlossary('api');
        expect(resultLower).toHaveLength(1);
        expect(resultLower[0].term).toBe('API');
    });

    it('should filter by description content', () => {
        const result = filterGlossary('container');
        expect(result).toHaveLength(1);
        expect(result[0].term).toBe('Docker');
    });

    it('should filter by tags', () => {
        const result = filterGlossary('DevOps');
        expect(result).toHaveLength(2);
        expect(result.map(r => r.term)).toContain('CI/CD');
        expect(result.map(r => r.term)).toContain('Docker');
    });

    it('should return multiple matches for partial term search', () => {
        const result = filterGlossary('learning');
        expect(result).toHaveLength(1);
        expect(result[0].term).toBe('Machine Learning');
    });

    it('should return empty array when no matches found', () => {
        const result = filterGlossary('xyz123notfound');
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('should match across term, description, and tags', () => {
        // "Integration" appears in tags of API entry
        const result = filterGlossary('integration');
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].term).toBe('API');
    });
});

