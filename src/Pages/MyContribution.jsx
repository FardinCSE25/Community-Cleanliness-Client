import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import jsPDF from 'jspdf';
// Ensure you have a 'daisyui' theme setup in your project (e.g., in tailwind.config.js)

const MyContribution = () => {
    // Note: 'use(AuthContext)' is an experimental React feature (Hooks like useContext are standard)
    const { user } = use(AuthContext); 
    const [contribution, setContribution] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Data Fetching Effect ---
    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            fetch(`https://community-cleanliness-server-phi.vercel.app/contribution?email=${user.email}`, {
                headers: {
                    // It's better practice to check if user.accessToken exists before using it
                    authorization: `Bearer ${user.accessToken}` 
                }
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch contributions');
                return res.json();
            })
            .then(data => {
                setContribution(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching contributions:", error);
                setContribution([]); // Clear contributions on error
                setIsLoading(false);
            });
        } else if (!user) {
            // Handle case where user is null (e.g., before loading) or no email
            setIsLoading(false); 
        }
    }, [user]);

    // --- PDF Download Handler ---
    const handleDownloadPDF = (title, amount, date, category) => {
        const pdf = new jsPDF();
        
        // Set primary color
        const primaryColor = [34, 139, 34]; // #228B22 (Forest Green)
        
        // Add company header with background
        pdf.setFillColor(...primaryColor);
        pdf.rect(0, 0, 210, 40, 'F');
        
        // Company name
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Community Cleanliness & Issue Reporting Portal", 105, 20, { align: 'center' });
        
        // Company details
        pdf.setFontSize(10);
        pdf.text("Dhaka, Mohammadpur | Phone: 01814935430", 105, 28, { align: 'center' });
        
        // Reset y position after header
        let y = 60;
        
        // Document title
        pdf.setTextColor(...primaryColor);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text("CONTRIBUTION RECEIPT", 20, y);
        
        y += 10;
        
        // Add decorative line
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.8);
        pdf.line(20, y, 190, y);
        
        y += 15;
        
        // Contribution details
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        
        const details = [
            { label: "Issue Title", value: title },
            { label: "Category", value: category },
            { label: "Contribution Amount", value: ` ${amount}` },
            { label: "Date", value: date },
            { label: "Contributor", value: user?.displayName || user?.email || 'N/A' }
        ];
        
        details.forEach(detail => {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${detail.label}:`, 20, y);
            pdf.setFont('helvetica', 'normal');
            pdf.text(detail.value, 70, y);
            y += 10;
        });
        
        y += 15;
        
        // Thank you message
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'italic');
        pdf.text("Thank you for your contribution to community cleanliness!", 20, y);
        
        y += 15;
        
        // Footer
        pdf.setDrawColor(200, 200, 200); // Lighter gray for footer line
        pdf.line(20, y, 190, y);
        y += 10;
        
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text("This is a computer generated receipt. No signature required.", 105, y, { align: 'center' });

        const fileName = `${title.replace(/\s/g, '_')}_contribution_receipt.pdf`;
        pdf.save(fileName);
    };

    // --- Render Component ---
    return (
        // Apply DaisyUI's 'data-theme' or rely on the parent wrapper to set the theme
        <div className='w-11/12 mx-auto pt-36 min-h-screen p-4'>
            <title>Community Cleanliness - My Contribution</title>
            
            {/* Header Section */}
            <div className="card shadow-xl p-6 mb-8 bg-base-100 border-l-4" style={{ borderColor: '#228B22' }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-base-content flex items-center">
                            <svg className="w-8 h-8 mr-3" style={{ color: '#228B22' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
                            My Contributions
                        </h1>
                        <p className="text-base-content/80 mt-2">
                            Track your invaluable support for community cleanliness efforts.
                        </p>
                    </div>
                    <div className="stats shadow bg-green-100 dark:bg-[#1a3a1a] dark:text-white mt-4 md:mt-0">
                        <div className="stat">
                            <div className="stat-figure text-[#228B22]">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v2m0 0a3 3 0 100 6 3 3 0 000-6zm-3 3h6" /></svg>
                            </div>
                            <div className="stat-title text-base-content/70">Total Contributions</div>
                            <div className="stat-value text-3xl font-extrabold" style={{ color: '#228B22' }}>
                                {contribution.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contributions Table */}
            <div className="card bg-base-100 shadow-xl overflow-x-auto mb-8">
                <div className="card-body p-0">
                    <div className="p-6 border-b border-base-200">
                        <h3 className="text-2xl font-semibold text-base-content">Contribution History</h3>
                    </div>
                    
                    {isLoading && (
                        <div className="p-8 text-center">
                            <span className="loading loading-spinner loading-lg" style={{ color: '#228B22' }}></span>
                            <p className="mt-3 text-base-content/70">Loading your contributions...</p>
                        </div>
                    )}

                    {!isLoading && contribution.length > 0 && (
                        <table className="table w-full table-zebra">
                            {/* Table Head */}
                            <thead className='text-base-content/80'>
                                <tr>
                                    <th className="py-4 text-center font-bold">No.</th>
                                    <th className="py-4 text-left font-bold">Issue Details</th>
                                    <th className="py-4 text-center font-bold">Amount</th>
                                    <th className="py-4 text-center font-bold">Date</th>
                                    <th className="py-4 text-center font-bold">Action</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {contribution.map((con, index) => (
                                    <tr key={con._id}>
                                        <td className="py-4 text-center">
                                            <div className="badge badge-lg" style={{ backgroundColor: '#228B22', color: 'white' }}>
                                                {index + 1}
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex flex-col space-y-1">
                                                <h1 className="font-semibold text-base-content text-lg">{con.title}</h1>
                                                <span className="badge badge-outline text-base-content/70">
                                                    {con.category}
                                                </span>
                                            </div>
                                        </td>
                                        
                                        <td className="py-4 text-center">
                                            <span className="font-extrabold text-xl" style={{ color: '#228B22' }}>
                                                ৳ {con.amount}
                                            </span>
                                        </td>

                                        <td className="py-4 text-center text-base-content/70">
                                            {con.date}
                                        </td>

                                        <td className="py-4 text-center">
                                            <button 
                                                onClick={() => handleDownloadPDF(con.title, con.amount, con.date, con.category)}
                                                className="btn btn-sm text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-200"
                                                style={{ backgroundColor: '#228B22', borderColor: '#228B22' }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                Receipt
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Empty State */}
                    {!isLoading && contribution.length === 0 && (
                        <div className="text-center py-12 bg-base-200">
                            <div className="mx-auto w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10" style={{ color: '#228B22' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-4-8h8" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">No Contributions Found</h3>
                            <p className="text-base-content/70">
                                It looks like you haven't made any contributions yet. Start contributing today!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#228B22' }}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h4 className="text-lg font-semibold text-base-content">Contribution Receipts & Records</h4>
                        <p className="text-base-content/70 mt-1">
                            Use the **Download Receipt** button to save an official PDF record of your donation. This documentation from 
                            **FardinMicrosoft Limited** verifies your support for the community cleanliness initiative.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContribution;