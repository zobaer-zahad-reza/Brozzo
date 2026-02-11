import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OurTeamMessage from '../Components/OurTeamMessage';
import TeamMemberCard from '../Components/TeamMemberCard';
import DirectorImg from '../assets/DirectorImg.png';
import vicePrecidentImg from '../assets/vicePrecident.png';

const OurTeam = ({ backendUrl }) => {
    // Leadership Demo Data
    const [leadershipMembers, setLeadershipMembers] = useState([
        {
            _id: "lead1",
            name: "Md. Tanvir Hasan", 
            role: "Managing Director & CEO",
            image: DirectorImg,
            message: [
                "As the Managing Director and CEO of Vivid Valley, I am honored to lead a company driven by quality, trust, and a global vision. Our journey began with a simple goal: to connect premium products with customers worldwide.",
                "Quality guides every decision we make. As we grow, our mission remains clear – to become the world’s most trusted destination for discovering unique, high-quality goods."
            ],
            isReverse: false,
            bgColour: "#ffffff"
        },
        {
            _id: "lead2",
            name: "Sarah Rahman",
            role: "Vice President",
            image: vicePrecidentImg,
            message: [
                "At Vivid Valley, operations are the heartbeat of our success. Ensuring that every product sourced from Bangladesh reaches our clients in the USA or Italy flawlessly is my top priority.",
                "We believe in building bridges through commerce. Our logistics network is designed to be resilient, transparent, and efficient, ensuring peace of mind for our B2B partners."
            ],
            bgColour: "#FFDBBB",
            isReverse: true
        }
    ]);

    // Core Team Demo Data
    const [coreMembers, setCoreMembers] = useState([
        { 
            _id: 1, 
            name: "Robert Anderson", 
            role: "Head of USA Operations", 
            image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600" 
        },
        { 
            _id: 2, 
            name: "Liza Moretti", 
            role: "Sourcing Manager (Italy)", 
            image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
        },
        { 
            _id: 3, 
            name: "Ariful Islam", 
            role: "Supply Chain Analyst", 
            image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" 
        },
        { 
            _id: 4, 
            name: "Sophia Martinez", 
            role: "Quality Control Lead", 
            image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600" 
        }
    ]);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`/api/team/list`);
                if (response.data.success) {
                    const allMembers = response.data.members;
                    
                    const fetchedLead = allMembers.filter(m => m.isLeadership);
                    if (fetchedLead.length > 0) setLeadershipMembers(fetchedLead);
                    
                    const fetchedCore = allMembers.filter(m => !m.isLeadership);
                    if (fetchedCore.length > 0) setCoreMembers(fetchedCore);
                }
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };
        if(backendUrl) fetchTeamData();
    }, [backendUrl]);

    return (
        <section className="bg-[#F8F9FA] min-h-screen">
            {/* Header Section */}
            <div className="bg-black text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Meet The Minds <span className="text-gray-400">Behind </span> <span className='text-[#FEA24C]'>Vivid Valley</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    Dedicated to sourcing excellence and bridging global markets with trust and quality.
                </p>
            </div>

            {/* Leadership Sections */}
            <div className="space-y-0">
                {leadershipMembers.map((member) => (
                    <OurTeamMessage 
                        key={member._id}
                        name={member.name}
                        title={member.role}
                        image={member.image}
                        message={member.message}
                        bgColour={member.bgColour}
                        isReverse={member.isReverse}
                    />
                ))}
            </div>

            {/* Core Team Grid */}
            <div className="bg-white py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
                            Our Core Team
                        </h3>
                        <div className="h-1.5 w-24 bg-[#FEA24C] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {coreMembers.map((member) => (
                            <TeamMemberCard 
                                key={member._id}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;