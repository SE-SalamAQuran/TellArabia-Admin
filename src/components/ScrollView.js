import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";

const Card = (props) => {
    return (
        <div className="col">
            <div className="card">
                <h5>{props.title}</h5>
                <img src={props.img} alt="card-tag" />
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
            </div>
        </div>
    );
}

export default function ScrollView(props) {
    const services = [{
        id: 1,
        image: 'https://img.mobiscroll.com/demos/worms3.png',
        title: 'Worms 3',
        dev: 'Team 17 Digital Limited',
        rank: 4.2
    }, {
        id: 2,
        image: 'https://img.mobiscroll.com/demos/candycrush.png',
        title: 'Candy Crush Saga',
        dev: 'King',
        rank: 4.3
    }, {
        id: 3,
        image: 'https://img.mobiscroll.com/demos/angrybirds.png',
        title: 'Angry Birds',
        dev: 'Rovino',
        rank: 4.4
    }, {
        id: 4,
        image: 'https://img.mobiscroll.com/demos/nfs.png',
        title: 'Need for Speed™ No Limits',
        dev: 'ELECTRONIC ARTS',
        rank: 4.3
    }, {
        id: 5,
        image: 'https://img.mobiscroll.com/demos/heartstone.png',
        title: 'Hearthstone',
        dev: 'Blizzard Entertainment Inc.',
        rank: 4.2
    }, {
        id: 6,
        image: 'https://img.mobiscroll.com/demos/fruitninja.png',
        title: 'Fruit Ninja',
        dev: 'Halfbrick Studios',
        rank: 4.3
    }, {
        id: 7,
        image: 'https://img.mobiscroll.com/demos/subwaysurf.png',
        title: 'Subway Surfers',
        dev: 'Kiloo',
        rank: 4.4
    }, {
        id: 8,
        image: 'https://img.mobiscroll.com/demos/templerun.png',
        title: 'Temple Run',
        dev: 'Imangi Studios',
        rank: 4.3
    }, {
        id: 9,
        image: 'https://img.mobiscroll.com/demos/minecraft.png',
        title: 'Minecraft: Pocket Edition',
        dev: 'Mojang ',
        rank: 4.4
    }];
    return (
        <div id="carouselExampleControls" className="carousel slide" data-interval={false} data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    {services.map(function (service) {
                        return <Card key={service.id} img={service.image} />
                    })}
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={services[1].image} alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={services[2].image} alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}


