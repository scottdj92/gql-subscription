import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

const COUNTER_SUBSCRIPTION = gql`
    subscription {
        counter {
            count
            countStr
        }
    }
`;

export const Counter: React.FC = () => {
    const { data } = useSubscription(COUNTER_SUBSCRIPTION);
    const items = [];
    if (data) {
        items.push(data);
    }
    if (items.length < 1) {
        return null;
    }
    return (
        <ul>
            {
                items.map((ele) => <li key={ele.counter.count}>{ele.counter.count} {ele.counter.countStr}</li>)
            }
        </ul>
    );
};
