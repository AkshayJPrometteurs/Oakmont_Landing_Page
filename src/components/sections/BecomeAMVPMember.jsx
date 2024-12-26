"use client";
import React from "react";
import { Box, Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const BecomeAMVPMember = () => {
    const theme = useTheme()
    const plans = [
        {
            title: "Weekly",
            price: 17,
            billing: "Billed weekly",
            features: [
                "Arbitrage bot",
                "+EV bot",
                "Fantasy tournaments",
                "News and analysis",
                "Team events",
            ],
        },
        {
            title: "Monthly",
            price: 67,
            billing: "Billed Monthly",
            features: [
                "Arbitrage bot",
                "+EV bot",
                "Fantasy tournaments",
                "News and analysis",
                "Team events",
            ],
        },
    ];

    return (
        <Box sx={{ px : { xs : 8, md: 16 }, py : {xs : 5, md: 10 } }} id="become-a-mvp-member-section">
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center' style={{ fontFamily : theme.typography.secondaryFont }}>Become A MVP Member</h1>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, padding: 4 }}>
                {plans.map((plan) => (
                    <Card key={plan.title} sx={{ width: 300, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontFamily : theme.typography.interFont }}>
                                {plan.title}
                            </Typography>
                            <div className="flex justify-center">
                                <sup className="text-lg mt-2">$</sup>
                                <Typography variant="h3" component="div" sx={{ color: "blue", fontWeight: "bold" }}>{plan.price}</Typography>
                            </div>
                            <Typography variant="body2" sx={{ color: "gray" }}>{plan.billing}</Typography>
                            <List>
                                {plan.features.map((feature, i) => (
                                    <ListItem key={i}>
                                        <ListItemIcon>
                                            <RadioButtonUncheckedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={feature} />
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: 20 }}>
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default BecomeAMVPMember;
