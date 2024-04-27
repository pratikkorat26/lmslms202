import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { radio, radioChecked, checkBoxChecked, checkBox, selectDropdown } from "../../assets/images";

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

function CoursesPage() {
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
                <title>Course | Go-Canvas</title>
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
                            <h5>Courses</h5>
                            <h6>Go-Canvas</h6>
                        </div>
        {/* Innerpage-Table-Start */}
                        <div className="innerpage-table table">
                            <div className="card">
                                {/* <CustomTable></CustomTable> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        {/* Innerpage-End */}
        </>
    );
}

export default CoursesPage;