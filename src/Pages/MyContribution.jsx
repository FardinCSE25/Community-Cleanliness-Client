import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import jsPDF from 'jspdf';

const MyContribution = () => {
    const { user } = use(AuthContext);
    const [contribution, setContribution] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Data Fetching Effect ---
    useEffect(() => {
        if (user?.email) {
            setIsLoading(true);
            fetch(`https://community-cleanliness-server-phi.vercel.app/contribution?email=${user.email}`, {
                headers: {
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
                    setContribution([]);
                    setIsLoading(false);
                });
        } else if (!user) {
            setIsLoading(false);
        }
    }, [user]);

    const handleDownloadPDF = (title, amount, date, category) => {
        const pdf = new jsPDF();

        const primaryColor = [34, 139, 34];

        pdf.setFillColor(...primaryColor);
        pdf.rect(0, 0, 210, 40, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Community Cleanliness & Issue Reporting Portal", 105, 20, { align: 'center' });

        pdf.setFontSize(10);
        pdf.text("Dhaka, Mohammadpur | Phone: 01814935430", 105, 28, { align: 'center' });

        let y = 60;

        pdf.setTextColor(...primaryColor);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text("CONTRIBUTION RECEIPT", 20, y);

        y += 10;

        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.8);
        pdf.line(20, y, 190, y);

        y += 15;

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

        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'italic');
        pdf.text("Thank you for your contribution to community cleanliness!", 20, y);

        y += 15;

        // Footer
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, y, 190, y);
        y += 10;

        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text("This is a computer generated receipt. No signature required.", 105, y, { align: 'center' });

        const fileName = `${title.replace(/\s/g, '_')}_contribution_receipt.pdf`;
        pdf.save(fileName);
    };

    return (
        <div className='w-11/12 mx-auto pt-36 min-h-screen p-4'>
            <title>Community Cleanliness - My Contribution</title>


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

                            </div>
                            <div className="stat-title text-base-content/70">Total Contributions</div>
                            <div className="stat-value text-3xl font-extrabold" style={{ color: '#228B22' }}>
                                {contribution.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


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

                            <thead className='text-base-content/80'>
                                <tr>
                                    <th className="py-4 text-center font-bold">No.</th>
                                    <th className="py-4 text-left font-bold">Issue Details</th>
                                    <th className="py-4 text-center font-bold">Amount</th>
                                    <th className="py-4 text-center font-bold">Date</th>
                                    <th className="py-4 text-center font-bold">Action</th>
                                </tr>
                            </thead>


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


                    {!isLoading && contribution.length === 0 && (
                        <div className="text-center py-12 bg-base-200">
                            <div className="mx-auto w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-4">

                                <h1 className='text-4xl font-medium'>৳</h1>
                            </div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">No Contributions Found</h3>
                            <p className="text-base-content/70">
                                It looks like you haven't made any contributions yet. Start contributing today!
                            </p>
                        </div>
                    )}
                </div>
            </div>


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
                            **Community Cleanliness & Issue Reporting Portal** verifies your support for the community cleanliness initiative.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContribution;