// Course content and the local illustrations used by the interactive lesson.
const slidesData = [
    {
        type: 'title',
        title: 'Indian Economic Development',
        subtitle: 'A guided presentation for Class XI Economics',
        image: 'assets/cover-india-economy.svg',
        imageAlt: 'Fields, a factory, renewable energy, transport, and a growing Indian city'
    },
    {
        type: 'image-content', title: 'Course Overview', image: 'assets/development.svg',
        content: [
            'Trace the major phases of India’s economic history.',
            'Compare agriculture, industry, and services.',
            'Examine development programmes and persistent challenges.',
            'Connect domestic change with global economic relations.'
        ]
    },
    {
        type: 'image-content', title: 'What Do We Mean by Development?', image: 'assets/development.svg',
        content: [
            'Economic growth measures a rise in the production of goods and services.',
            'Development also considers health, education, opportunity, and quality of life.',
            'Income measures are useful, but they do not describe every part of wellbeing.',
            'Development goals differ across people and communities.'
        ]
    },
    {
        type: 'image-content', title: 'Historical Economic Context', image: 'assets/history.svg',
        content: [
            'Colonial rule reshaped production and trade around imperial priorities.',
            'After independence, planning and public investment guided development.',
            'Import substitution aimed to build domestic industrial capacity.',
            'Economic reforms beginning in 1991 changed policy and global engagement.'
        ]
    },
    {
        type: 'image-content', title: 'Economic Reforms Since 1991', image: 'assets/reforms.svg',
        content: [
            'Liberalization reduced many controls over production and trade.',
            'Privatization expanded the role of private enterprise in several areas.',
            'Globalization increased links with markets, investment, and technology abroad.',
            'Reforms created new opportunities as well as new adjustments for workers and firms.'
        ]
    },
    {
        type: 'image-content', title: 'Three Connected Economic Sectors', image: 'assets/sectors.svg',
        content: [
            'Agriculture supplies food and raw materials and supports rural livelihoods.',
            'Industry transforms materials into manufactured goods and infrastructure.',
            'Services include transport, communication, finance, education, and health.',
            'The sectors depend on one another through jobs, markets, and supply chains.'
        ]
    },
    {
        type: 'image-content', title: 'Agriculture and Rural Livelihoods', image: 'assets/agriculture.svg',
        content: [
            'Farming supports livelihoods and provides inputs for other industries.',
            'Irrigation, storage, transport, and access to markets shape farm outcomes.',
            'Land fragmentation and climate pressures affect many producers.',
            'Productivity can improve through research, resilient practices, and reliable services.'
        ]
    },
    {
        type: 'image-content', title: 'Industry and Production', image: 'assets/industry.svg',
        content: [
            'Manufacturing adds value by turning materials into useful products.',
            'Industry creates links with farming, logistics, energy, and business services.',
            'Small firms are important sources of production and employment.',
            'Skills, infrastructure, finance, and technology influence industrial growth.'
        ]
    },
    {
        type: 'image-content', title: 'Services and New Forms of Work', image: 'assets/services.svg',
        content: [
            'Services include education, healthcare, finance, transport, and communication.',
            'Digital services connect customers, workers, and businesses in new ways.',
            'Access and quality vary across regions and households.',
            'Skills and dependable infrastructure help people participate in this sector.'
        ]
    },
    {
        type: 'image-content', title: 'Development Challenges', image: 'assets/challenges.svg',
        content: [
            'Poverty limits people’s choices and access to essential services.',
            'Secure, productive work remains an important development concern.',
            'Inequality can restrict access to education, health, and economic opportunity.',
            'Infrastructure and public services differ across places.'
        ]
    },
    {
        type: 'image-content', title: 'Public Programmes and Initiatives', image: 'assets/public-programs.svg',
        content: [
            'Employment programmes support households and local assets.',
            'Sanitation initiatives focus on public health and community infrastructure.',
            'Digital programmes aim to widen access to public services and information.',
            'Manufacturing initiatives seek to strengthen domestic production.'
        ]
    },
    {
        type: 'image-content', title: 'Rural Development', image: 'assets/rural-development.svg',
        content: [
            'Reliable roads, electricity, water, and communications support village life.',
            'Healthcare and education access shape long-term opportunity.',
            'Rural enterprises can diversify income beyond farming.',
            'Local planning helps communities identify their own priorities.'
        ]
    },
    {
        type: 'image-content', title: 'Urban Development', image: 'assets/urban-development.svg',
        content: [
            'Cities bring workers, firms, services, and markets into close contact.',
            'Housing, transport, and public space influence everyday access.',
            'Urban growth places pressure on water, air quality, and waste systems.',
            'Good planning links new development with reliable public services.'
        ]
    },
    {
        type: 'image-content', title: 'Sustainable Development', image: 'assets/sustainability.svg',
        content: [
            'Development must consider how resources are used over time.',
            'Climate risks affect agriculture, infrastructure, health, and livelihoods.',
            'Cleaner energy and efficient production can reduce environmental pressure.',
            'The goal is to improve people’s lives while protecting future choices.'
        ]
    },
    {
        type: 'image-content', title: 'India and the Global Economy', image: 'assets/global-trade.svg',
        content: [
            'Exports connect domestic producers with buyers in other countries.',
            'Imports provide products, materials, and technologies for households and firms.',
            'Investment can bring capital, expertise, and links to supply chains.',
            'Trade relationships create both opportunities and exposure to global change.'
        ]
    },
    {
        type: 'image-content', title: 'Learning Outcomes', image: 'assets/development.svg',
        content: [
            'Explain how India’s development strategy changed over time.',
            'Describe links among agriculture, industry, and services.',
            'Discuss how policy and public programmes address development challenges.',
            'Use economic ideas to interpret examples from everyday life.'
        ]
    },
    {
        type: 'content', title: 'Assessment and Discussion',
        content: [
            'Compare growth and development using a local example.',
            'Map a product’s journey across the three economic sectors.',
            'Discuss how one public programme affects a community.',
            'Support conclusions with evidence from class materials.'
        ]
    },
    {
        type: 'content', title: 'Learning Resources',
        content: [
            'NCERT economics textbooks for Classes XI and XII.',
            'Government economic surveys and statistical publications.',
            'Publications from ministries and research institutions.',
            'Credible reporting on economic and policy issues.'
        ]
    },
    {
        type: 'title', title: 'Questions and Discussion',
        subtitle: 'Indian Economic Development',
        message: 'Which change has most shaped economic opportunity in your community?'
    }
];
