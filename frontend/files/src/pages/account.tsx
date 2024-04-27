import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { radio, radioChecked, checkBoxChecked, checkBox, selectDropdown, johnsmithside } from "../assets/images";

function CheckboxDefault() {
    return (<img src={checkBox} alt="checkbox" />);
}
function CheckboxChecked() {
    return (<img src={checkBoxChecked} alt="checkbox" />);
}
function RadioDefault() {
    return (<img src={radio} alt="checkbox" />);
}
function RadioChecked() {
    return (<img src={radioChecked} alt="checkbox" />);
}

function MultiDropdownArrow() {
    return (
        <img className="multi-dropdown" src={selectDropdown} alt="downarrow" />
    );
}

function AccountPage() {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [date, setDate] = React.useState<Date | null>(null);
    return (
        <>
            <Helmet>
                <title>Profile | Go-Canvas</title>
            </Helmet>
            {/* Innerpage-Start */}
            <div className="wrapper">
                <div className="overlay" onClick={e => document.body.classList.toggle('sidebar-open')}></div>
                <div className="search-overlay" onClick={e => document.body.classList.toggle('search-open')}></div>
                <Header></Header>
                <div className="main-background"></div>
                <main className="dashnoard-content">
                    <div className="sidebar">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="main-content">
                        <div className="main-title">
                            <h5>Profile</h5>
                            <h6>Go-Canvas</h6>
                        </div>
                        <div className="innerpage-table table">
                            <div className="card">
                                <div className="profile">
                                    <div className="profile-img">
                                        <img src={johnsmithside} alt="john-smith" />
                                    </div>
                                    <h6>John Smith</h6>
                                    <p>UI/UX Designer</p>
                                </div>
                                <div style={{right:"10px", position: "absolute"}}>
                                <Button variant="contained" style={{marginRight: '5px'}}>Manage Notifications</Button>
                                <Button variant="contained">Edit Profile</Button>
                                </div>
                                <div>
                                <TextField id="standard-basic" label="Contact" variant="standard" />
                                <TextField id="standard-basic" label="Biography" variant="standard" />
                                </div>
                                <div>
                                    <h2>Links</h2>
                                    <ul>
                                        <li>Website 1</li>
                                        <li>Website 2</li>
                                        <li>Website 3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Innerpage-End */}
        </>
    )
}
export default AccountPage;
