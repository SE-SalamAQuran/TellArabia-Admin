import React from 'react';
import AccordionMUI from "./ApplicationsAccordion";
export default function Applications() {
    var width = window.innerWidth;
    return (
        <div style={{ textAlign: "center", width: { width } }}>
            <h1>Job Applications</h1>
            <AccordionMUI />
        </div>
    )
}
