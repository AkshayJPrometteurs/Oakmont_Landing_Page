const Menus = () => {
    const navItems = [
        { name: 'Home', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#home-section`} ,
        { name: 'App', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#download-app-section` },
        { name: 'AI Tips', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#ai-tips-section` },
        { name: 'FAQ', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#faqs-section` },
        { name: 'Subscription', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#become-a-mvp-member-section` },
        { name: 'Testimonials', url: `${process.env.NEXT_PUBLIC_FORNTEND_BASE_URL}/#testimonials-section` }
    ];
    return navItems;
}

export default Menus