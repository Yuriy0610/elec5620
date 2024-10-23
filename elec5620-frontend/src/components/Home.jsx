import React from 'react';

const universities = [
    { name: 'The University of Sydney', url: 'https://www.sydney.edu.au' },
    { name: 'The University of Melbourne', url: 'https://www.unimelb.edu.au' },
    { name: 'The Australian National University', url: 'https://www.anu.edu.au' },
    { name: 'The University of Queensland', url: 'https://www.uq.edu.au' },
    { name: 'University of New South Wales (UNSW)', url: 'https://www.unsw.edu.au' },
    { name: 'Monash University', url: 'https://www.monash.edu' },
    { name: 'University of Western Australia', url: 'https://www.uwa.edu.au' },
    { name: 'University of Adelaide', url: 'https://www.adelaide.edu.au' },
    { name: 'Macquarie University', url: 'https://www.mq.edu.au' },
    { name: 'University of Technology Sydney (UTS)', url: 'https://www.uts.edu.au' },
];

const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-orange-800 mb-6">Australian Universities</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {universities.map((university, index) => (
                    <li key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <a
                            href={university.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-indigo-800 hover:underline block text-center"
                        >
                            {university.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
