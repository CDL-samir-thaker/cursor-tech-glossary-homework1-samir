// Tech Glossary Data
const glossaryData = [
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
        term: "Microservices",
        description: "An architectural style that structures an application as a collection of small, independent services that communicate over network protocols.",
        tags: ["Architecture", "Backend", "Scalability"]
    },
    {
        term: "RESTful",
        description: "Representational State Transfer - an architectural style for designing networked applications using stateless HTTP requests.",
        tags: ["API", "Web", "Backend"]
    },
    {
        term: "Docker",
        description: "A platform for developing, shipping, and running applications in isolated containers that package code and dependencies together.",
        tags: ["DevOps", "Container", "Infrastructure"]
    },
    {
        term: "GraphQL",
        description: "A query language for APIs that allows clients to request exactly the data they need, making APIs more flexible and efficient.",
        tags: ["API", "Frontend", "Backend"]
    },
    {
        term: "Kubernetes",
        description: "An open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.",
        tags: ["DevOps", "Container", "Orchestration"]
    }
];

// Tag color mapping - improved contrast ratios for WCAG AA compliance
const tagColors = {
    "Backend": "bg-blue-600 text-white",
    "Frontend": "bg-green-600 text-white",
    "DevOps": "bg-purple-600 text-white",
    "API": "bg-amber-600 text-white",
    "Web": "bg-pink-600 text-white",
    "Integration": "bg-indigo-600 text-white",
    "Automation": "bg-red-600 text-white",
    "Development": "bg-cyan-700 text-white",
    "AI": "bg-orange-600 text-white",
    "Data Science": "bg-teal-700 text-white",
    "Algorithm": "bg-lime-700 text-white",
    "Architecture": "bg-violet-600 text-white",
    "Scalability": "bg-sky-600 text-white",
    "Container": "bg-emerald-600 text-white",
    "Infrastructure": "bg-slate-700 text-white",
    "Orchestration": "bg-fuchsia-600 text-white"
};

// Get tag color class or default
function getTagColor(tag) {
    return tagColors[tag] || "bg-gray-700 text-white";
}

// Create HTML for a single glossary entry
function createGlossaryCard(entry) {
    const termId = `term-${entry.term.replace(/\s+/g, '-').toLowerCase()}`;
    const tagsHTML = entry.tags
        .map(tag => `<span class="tag inline-block px-2 py-0.5 text-xs font-medium rounded ${getTagColor(tag)}" role="term" aria-label="Category: ${tag}">${tag}</span>`)
        .join('');

    return `
        <article class="glossary-card bg-white rounded-lg shadow-sm border border-gray-300 p-4 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500" role="article" aria-labelledby="${termId}">
            <h2 id="${termId}" class="text-lg font-bold text-gray-900 mb-1.5 leading-tight">${entry.term}</h2>
            <p class="text-sm text-gray-800 mb-3 leading-relaxed">${entry.description}</p>
            <div class="flex flex-wrap gap-1.5" role="list" aria-label="Categories">
                ${tagsHTML}
            </div>
        </article>
    `;
}

// Render glossary entries
function renderGlossary(entries) {
    const container = document.getElementById('glossaryContainer');
    const emptyState = document.getElementById('emptyState');
    const resultsCount = document.getElementById('resultsCount');
    const totalTerms = glossaryData.length;

    if (entries.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        resultsCount.textContent = 'No results found';
    } else {
        emptyState.classList.add('hidden');
        container.innerHTML = entries.map(entry => createGlossaryCard(entry)).join('');
        
        // Update results count
        if (entries.length === totalTerms) {
            resultsCount.textContent = 'Showing all terms';
        } else {
            resultsCount.textContent = `Showing ${entries.length} of ${totalTerms} terms`;
        }
    }
}

// Filter glossary entries based on search query
function filterGlossary(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        return glossaryData;
    }

    return glossaryData.filter(entry => {
        const termMatch = entry.term.toLowerCase().includes(searchTerm);
        const descMatch = entry.description.toLowerCase().includes(searchTerm);
        const tagMatch = entry.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return termMatch || descMatch || tagMatch;
    });
}

// Get search suggestions based on query
function getSuggestions(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        return [];
    }
    
    // Find terms that match the query
    const suggestions = glossaryData
        .filter(entry => entry.term.toLowerCase().includes(searchTerm))
        .map(entry => entry.term)
        .slice(0, 5); // Limit to 5 suggestions
    
    return suggestions;
}

// Render search suggestions
function renderSuggestions(suggestions) {
    const dropdown = document.getElementById('suggestionsDropdown');
    
    if (suggestions.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }
    
    const suggestionsHTML = suggestions
        .map(term => `
            <button 
                class="suggestion-item w-full text-left px-4 py-2.5 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-gray-800 font-medium border-b border-gray-100 last:border-b-0"
                role="option"
                aria-label="Select ${term}"
            >
                ${term}
            </button>
        `)
        .join('');
    
    dropdown.innerHTML = suggestionsHTML;
    dropdown.classList.remove('hidden');
    
    // Add click handlers to suggestions
    const suggestionButtons = dropdown.querySelectorAll('.suggestion-item');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const term = button.textContent.trim();
            selectSuggestion(term);
        });
    });
}

// Select a suggestion
function selectSuggestion(term) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = term;
    
    const filteredEntries = filterGlossary(term);
    renderGlossary(filteredEntries);
    toggleClearButton();
    
    // Hide suggestions
    document.getElementById('suggestionsDropdown').classList.add('hidden');
}

// Hide suggestions dropdown
function hideSuggestions() {
    document.getElementById('suggestionsDropdown').classList.add('hidden');
}

// Toggle clear button visibility
function toggleClearButton() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');
    
    if (searchInput.value.trim()) {
        clearButton.classList.remove('hidden');
    } else {
        clearButton.classList.add('hidden');
    }
}

// Clear search input
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.focus();
    toggleClearButton();
    renderGlossary(glossaryData);
}

// Initialize the application
function init() {
    // Render initial glossary
    renderGlossary(glossaryData);

    // Setup search functionality
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const filteredEntries = filterGlossary(query);
        renderGlossary(filteredEntries);
        toggleClearButton();
        
        // Show suggestions
        const suggestions = getSuggestions(query);
        renderSuggestions(suggestions);
    });
    
    // Setup clear button
    clearButton.addEventListener('click', clearSearch);
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        const searchSection = e.target.closest('[role="search"]');
        if (!searchSection) {
            hideSuggestions();
        }
    });
    
    // Hide suggestions on Escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideSuggestions();
            searchInput.blur();
        }
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

