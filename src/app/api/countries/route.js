export async function GET(req) {
    const countries = [
        { name: "United States", zipCodeLength: 5 },
        { name: "Canada", zipCodeLength: 6 },
        { name: "United Kingdom", zipCodeLength: 6 },
        { name: "France", zipCodeLength: 5 },
        { name: "Germany", zipCodeLength: 5 },
        { name: "India", zipCodeLength: 6 },
        { name: "China", zipCodeLength: 6 },
        { name: "Japan", zipCodeLength: 7 },
        { name: "Australia", zipCodeLength: 4 },
        { name: "Brazil", zipCodeLength: 8 },
        { name: "South Africa", zipCodeLength: 4 },
        { name: "Russia", zipCodeLength: 6 },
        { name: "Italy", zipCodeLength: 5 },
        { name: "Spain", zipCodeLength: 5 },
        { name: "Mexico", zipCodeLength: 5 },
        { name: "South Korea", zipCodeLength: 5 },
        { name: "Indonesia", zipCodeLength: 5 },
        { name: "Argentina", zipCodeLength: 8 },
        { name: "Saudi Arabia", zipCodeLength: 5 },
        { name: "Egypt", zipCodeLength: 5 },
        { name: "Nigeria", zipCodeLength: 6 },
        { name: "Singapore", zipCodeLength: 6 },
        { name: "Thailand", zipCodeLength: 5 },
        { name: "Vietnam", zipCodeLength: 6 },
        { name: "Philippines", zipCodeLength: 4 },
        { name: "Pakistan", zipCodeLength: 5 },
        { name: "Bangladesh", zipCodeLength: 4 },
        { name: "Malaysia", zipCodeLength: 5 },
        { name: "Tanzania", zipCodeLength: 5 },
        { name: "Kenya", zipCodeLength: 5 },
        { name: "Uganda", zipCodeLength: 5 },
        { name: "Zimbabwe", zipCodeLength: 5 },
        { name: "Kuwait", zipCodeLength: 5 },
        { name: "Qatar", zipCodeLength: 5 },
        { name: "Bahrain", zipCodeLength: 5 },
        { name: "Oman", zipCodeLength: 3 },
        { name: "United Arab Emirates", zipCodeLength: 6 },
        { name: "Jordan", zipCodeLength: 5 },
        { name: "Israel", zipCodeLength: 7 },
        { name: "Morocco", zipCodeLength: 5 },
        { name: "Portugal", zipCodeLength: 4 },
        { name: "Sweden", zipCodeLength: 5 },
        { name: "Finland", zipCodeLength: 5 },
        { name: "Norway", zipCodeLength: 4 },
        { name: "Denmark", zipCodeLength: 4 },
        { name: "Poland", zipCodeLength: 5 },
        { name: "Netherlands", zipCodeLength: 6 },
        { name: "Belgium", zipCodeLength: 4 },
        { name: "Austria", zipCodeLength: 4 },
        { name: "Switzerland", zipCodeLength: 4 },
        { name: "Slovakia", zipCodeLength: 5 },
        { name: "Czech Republic", zipCodeLength: 5 },
        { name: "Hungary", zipCodeLength: 4 },
        { name: "Romania", zipCodeLength: 6 },
        { name: "Bulgaria", zipCodeLength: 4 },
        { name: "Croatia", zipCodeLength: 5 },
        { name: "Slovenia", zipCodeLength: 4 },
        { name: "Serbia", zipCodeLength: 5 },
        { name: "Montenegro", zipCodeLength: 5 },
        { name: "Albania", zipCodeLength: 4 },
        { name: "North Macedonia", zipCodeLength: 4 },
        { name: "Armenia", zipCodeLength: 4 },
        { name: "Belarus", zipCodeLength: 6 },
        { name: "Ukraine", zipCodeLength: 5 }
    ];

    return new Response(JSON.stringify(countries), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
