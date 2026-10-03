// Slides data with content and images
const slidesData = [
    {
        type: 'title',
        title: 'Indian Economic Development',
        subtitle: 'Scheme of Work - Class XI',
        image: 'assets/cover-india-economy.svg'
    },
    {
        type: 'image-content',
        title: 'Course Overview',
        image: 'assets/development.svg',
        content: [
            '📚 Understanding Indian Economic Development',
            '📈 Historical Context and Growth',
            '🏭 Key Economic Sectors',
            '🎯 Development Challenges and Solutions',
            '🚀 Future Economic Prospects'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 1: Introduction to Economic Development',
        image: 'assets/development.svg',
        content: [
            '📖 Definition of economic development',
            '📊 Difference between growth and development',
            '📈 Indicators of development (GDP, HDI, etc.)',
            '🏛️ Role of government in development',
            '🎯 Development goals and objectives'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 2: Historical Economic Context',
        image: 'assets/history.svg',
        content: [
            '🏛️ Pre-Independence Era:',
            '   • Colonial economy and its impact',
            '   • Deindustrialization period',
            '📅 Post-Independence (1947-1990):',
            '   • Five-year plans',
            '   • Import substitution strategy',
            '   • State-led development'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 3: Economic Reforms (1991 Onwards)',
        image: 'assets/reforms.svg',
        content: [
            '🔓 Dismantling of License Raj',
            '💼 Foreign Direct Investment (FDI) policy',
            '🌍 Trade liberalization and globalization',
            '💻 Technology and innovation adoption',
            '📊 Market-driven economic policies'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 4: Major Economic Sectors',
        image: 'assets/sectors.svg',
        content: [
            '🌾 Agriculture Sector - Rural backbone',
            '🏭 Industrial Sector - Manufacturing and production',
            '💼 Services Sector - Fastest growing segment',
            '🔗 Interdependence and sectoral linkages',
            '📊 Contribution to GDP and employment'
        ]
    },
    {
        type: 'image-content',
        title: 'Agriculture Sector',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%232D5016"/><rect y="200" width="400" height="100" fill="%238B7355"/><circle cx="80" cy="150" r="30" fill="%23D4A574"/><circle cx="120" cy="160" r="25" fill="%23D4A574"/><path d="M 200 100 L 180 200 L 220 200 Z" fill="%23228B22"/><path d="M 250 120 L 230 200 L 270 200 Z" fill="%23228B22"/><path d="M 300 110 L 280 200 L 320 200 Z" fill="%23228B22"/><circle cx="350" cy="140" r="20" fill="%23FFD700"/></svg>',
        content: [
            '📊 Contribution to GDP: ~15-18%',
            '👥 Employment: ~40% of workforce',
            '🌾 Green Revolution impact on productivity',
            '🔬 Modern agricultural techniques and technology',
            '⚠️ Challenges: Land fragmentation, climate change, water scarcity'
        ]
    },
    {
        type: 'image-content',
        title: 'Industrial Sector',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%234A7C9E"/><rect x="50" y="100" width="60" height="150" fill="%238B7355"/><rect x="50" y="80" width="60" height="25" fill="%23808080"/><rect x="150" y="80" width="70" height="170" fill="%238B7355"/><rect x="150" y="50" width="70" height="35" fill="%23808080"/><rect x="260" y="110" width="50" height="140" fill="%238B7355"/><rect x="260" y="85" width="50" height="30" fill="%23808080"/><circle cx="85" cy="70" r="8" fill="%23FFD700"/><circle cx="190" cy="35" r="8" fill="%23FFD700"/><circle cx="285" cy="75" r="8" fill="%23FFD700"/><rect y="250" width="400" height="50" fill="%23666666"/></svg>',
        content: [
            '📊 Contribution to GDP: ~25-30%',
            '🏭 Key industries: Steel, Textiles, Pharmaceuticals, IT',
            '🎯 Small and Medium Enterprises (MSMEs)',
            '🔨 Make in India initiative',
            '🌉 Infrastructure and logistics support'
        ]
    },
    {
        type: 'image-content',
        title: 'Services Sector',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23F5F7F0"/><rect x="30" y="40" width="120" height="150" fill="%234A7C9E" stroke="%232D5016" stroke-width="2"/><text x="90" y="130" font-size="24" text-anchor="middle" fill="white">💻</text><rect x="170" y="40" width="120" height="150" fill="%234A7C9E" stroke="%232D5016" stroke-width="2"/><text x="230" y="130" font-size="24" text-anchor="middle" fill="white">💰</text><rect x="310" y="40" width="60" height="150" fill="%234A7C9E" stroke="%232D5016" stroke-width="2"/><text x="340" y="130" font-size="24" text-anchor="middle" fill="white">🏥</text><path d="M 50 220 L 150 240 L 250 200 L 350 220 L 390 230" stroke="%232D5016" stroke-width="3" fill="none"/></svg>',
        content: [
            '📊 Fastest growing sector - ~50-55% of GDP',
            '💻 Information Technology (IT) and BPO boom',
            '💰 Finance, Banking, and Insurance (BFSI)',
            '✈️ Tourism and Hospitality industry',
            '🏥 Healthcare and Education services'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 5: Development Challenges',
        image: 'assets/challenges.svg',
        content: [
            '💔 Poverty: Despite growth, significant poverty remains',
            '👥 Unemployment: Especially youth unemployment',
            '⚖️ Inequality: Wealth and income disparities',
            '🌉 Infrastructure: Roads, electricity, water, sanitation',
            '📚 Education & Health: Quality and accessibility'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 6: Government Programs & Initiatives',
        image: 'assets/public-programs.svg',
        content: [
            '👷 MGNREGA: Rural employment guarantee',
            '🚿 Swachh Bharat: Sanitation and cleanliness drive',
            '🌐 Digital India: Digital infrastructure and literacy',
            '🏭 Make in India: Manufacturing sector promotion',
            '🎁 Pradhan Mantri Schemes: Various welfare programs'
        ]
    },
    {
        type: 'image-content',
        title: 'Rural Development',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23E8F0E1"/><rect y="200" width="400" height="100" fill="%238B7355"/><polygon points="100,150 80,200 120,200" fill="%23CD5C5C"/><polygon points="200,120 170,200 230,200" fill="%23CD5C5C"/><polygon points="300,140 270,200 330,200" fill="%23CD5C5C"/><circle cx="50" cy="80" r="8" fill="%23FFD700"/><circle cx="100" cy="60" r="8" fill="%23FFD700"/><circle cx="150" cy="70" r="8" fill="%23FFD700"/><line x1="0" y1="180" x2="400" y2="180" stroke="%234A7C9E" stroke-width="2"/><path d="M 200 170 L 200 190" stroke="%234A7C9E" stroke-width="2"/><path d="M 300 170 L 300 190" stroke="%234A7C9E" stroke-width="2"/></svg>',
        content: [
            '🌾 Agricultural productivity improvement programs',
            '🌉 Village infrastructure development',
            '💡 Rural electrification and connectivity',
            '🏥📚 Healthcare and education access',
            '🏭 Cottage and small industries promotion',
            '🌱 Sustainable and organic farming practices'
        ]
    },
    {
        type: 'image-content',
        title: 'Urban Development',
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%2387CEEB"/><rect x="30" y="120" width="50" height="130" fill="%23696969" stroke="%23000" stroke-width="2"/><rect x="100" y="100" width="50" height="150" fill="%23696969" stroke="%23000" stroke-width="2"/><rect x="170" y="80" width="50" height="170" fill="%23696969" stroke="%23000" stroke-width="2"/><rect x="240" y="110" width="50" height="140" fill="%23696969" stroke="%23000" stroke-width="2"/><rect x="310" y="130" width="50" height="120" fill="%23696969" stroke="%23000" stroke-width="2"/><rect y="250" width="400" height="50" fill="%2388AA00"/><circle cx="80" cy="50" r="5" fill="%23FFD700"/><circle cx="150" cy="40" r="5" fill="%23FFD700"/><circle cx="280" cy="55" r="5" fill="%23FFD700"/></svg>',
        content: [
            '🌆 Rapid urbanization and its challenges',
            '🏠 Housing and slum redevelopment',
            '🚇 Transportation and urban mobility',
            '🏙️ Smart cities and digital solutions',
            '♻️ Pollution and waste management',
            '💼 Urban employment opportunities'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 9: Sustainable Development',
        image: 'assets/sustainability.svg',
        content: [
            '🌍 Environmental concerns and conservation',
            '☁️ Climate change impact on the economy',
            '♻️ Green economy and renewable energy transition',
            '🤝 Corporate Social Responsibility (CSR)',
            '🔄 Circular economy and waste reduction',
            '🎯 Sustainable Development Goals (SDGs)'
        ]
    },
    {
        type: 'image-content',
        title: 'Unit 10: International Economic Relations',
        image: 'assets/global-trade.svg',
        content: [
            '📤 Export and Import trends analysis',
            '🤝 Trade agreements and bilateral partnerships',
            '💼 Foreign Direct Investment (FDI) inflows',
            '💸 Remittances from diaspora and workers',
            '🌍 India\'s position in global economy',
            '📋 WTO and international trade commitments'
        ]
    },
    {
        type: 'image-content',
        title: 'Learning Outcomes',
        image: 'assets/development.svg',
        content: [
            '✅ Understand Indian economic development journey',
            '✅ Analyze key economic sectors and their roles',
            '✅ Evaluate development challenges and solutions',
            '✅ Apply economic concepts to real-world scenarios',
            '✅ Think critically about sustainable development',
            '✅ Develop analytical and research skills'
        ]
    },
    {
        type: 'content',
        title: 'Assessment Methods',
        content: [
            '💬 Class participation and discussions',
            '📋 Case studies and project work',
            '❓ Quizzes and assignments',
            '🔬 Research projects on economic themes',
            '📝 Term exams and continuous evaluation',
            '🎤 Presentations and seminars'
        ]
    },
    {
        type: 'content',
        title: 'Learning Resources',
        content: [
            '📚 NCERT Economics Textbooks (Class XI & XII)',
            '📊 Government economic surveys and reports',
            '📋 Ministry publications and policy documents',
            '📰 Economic and financial news sources',
            '🎥 Online educational platforms and videos',
            '💾 Statistical data from government websites'
        ]
    },
    {
        type: 'title',
        title: 'Thank You',
        subtitle: 'Questions and Discussion',
        message: 'Indian Economic Development: Understanding the past, analyzing the present, building the future'
    }
];
