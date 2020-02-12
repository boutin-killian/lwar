import React, {useContext, useState} from "react";
import {useSpring, animated} from "react-spring";
import {Card, Image, Icon, Button} from "semantic-ui-react";
import {CartContext} from "../App";
import axios from "axios";

const ArticleCard = ({data, type, typeLabel, addVote}) => {
    const {addToCart} = useContext(CartContext);
    const [anim, setAnim] = useState(false);
    const props = useSpring({to: {x: anim ? 0 : 1}});

    function handleAddToCart(data) {
        setAnim(!anim);
        addToCart(data);
    }

    function handleAddVote(data) {
        const config = {
            "Content-Type": "application/json",
        };

        axios
            .put("http://localhost:3002/vote", data, config)
            .then(res => {
                console.log("res.data", res.data);
            })
            .catch(err => {console.error('error', err)});
    }

    return (
        <Card style={{height: "100%"}} className={type}>
            <Image src={data.image} wrapped ui={false} style={{width: 120}}/>
            <Card.Content>
                <Card.Header>{data.title}</Card.Header>
                <Card.Meta>
                    <span className="date">publié en {data.year}</span>
                </Card.Meta>
                <Card.Meta>
                    <span className="type">{typeLabel}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <animated.div
                    style={{
                        transform: props.x
                            .interpolate({
                                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                output: [1, 0.97, 0.95, 1.1, 0.95, 1.1, 1.03, 1]
                            })
                            .interpolate(x => `scale(${x})`)
                    }}
                >
                    <Icon
                        name="add to cart"
                        size="big"
                        onClick={() => handleAddToCart(data)}
                        style={{cursor: "pointer"}}
                    />
                </animated.div>
                <Button animated onClick={() => handleAddVote(data)}>
                    <Button.Content visible>J'aime</Button.Content>
                    <Button.Content hidden>
                        <Icon name="like" />
                    </Button.Content>
                </Button>
            </Card.Content>
        </Card>
    );
};
export default ArticleCard;
