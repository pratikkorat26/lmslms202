import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { selectDropdown } from "../assets/images";

function DropdownArrow() {
    return (
        <img className="dropdown-icon" src={selectDropdown} alt="downarrow" />
    );
}

function DashboardDropdown() {
    const [number2, setNumber] = React.useState('');
    const handleChange2 = (event: SelectChangeEvent) => {
        setNumber(event.target.value as string);
    };
    return (<>
        <FormControl className="dropdown">
            <Select
                name="dropdown"
                value={number2}
                onChange={handleChange2}
                displayEmpty
                IconComponent={DropdownArrow}
                inputProps={{ "aria-label": "Without label" }}
                sx={{ width: "100%", background: "transperant" }}
            >
                <MenuItem value="">
                    <p>Monthly</p>
                </MenuItem>
                <MenuItem value={"10"}>Weekly</MenuItem>
                <MenuItem value={"20"}>Yeary</MenuItem>
            </Select>
        </FormControl>
    </>);
}
export default DashboardDropdown;