import React, { Fragment } from "react";
import groupBy from "lodash.groupby";
import dayjs from "dayjs";
import styled from "styled-components";

import Button from "components/designSystem/Button";

const EmptyBlock = styled.div`
  padding: 50px;
  color: #9a9a9a;
`;

const Spacer = styled.hr`
  border: none;
  padding: 20px;
`;

const List = ({ items, markAsCompleted, deleteTodo }) => {
  if (!items || items.length === 0) {
    return <EmptyBlock>Nothing here!!</EmptyBlock>;
  }
  const activeItems = items.filter((item) => item.status === "active");
  const activeGroupedItems = groupBy(activeItems, "dueDate");
  const completedItems = items.filter((item) => item.status === "complete");
  const isActiveItems = !(
    Object.keys(activeGroupedItems).length === 0 &&
    activeGroupedItems.constructor === Object
  );
  const isCompletedItems = completedItems && completedItems.length > 0;
  const isDivider = isActiveItems && isCompletedItems;
  return (
    <div>
      {isActiveItems ? (
        <ActiveItemsList
          groupedItems={activeGroupedItems}
          markAsCompleted={markAsCompleted}
        />
      ) : (
        <EmptyBlock>Hurrey! Everything is complete!!</EmptyBlock>
      )}
      {isDivider && <Spacer />}
      {isCompletedItems && (
        <CompletedItemsList items={completedItems} deleteTodo={deleteTodo} />
      )}
    </div>
  );
};

const ItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 2px 2px 5px;
  border-bottom: 1px solid #dadada;
  border-radius: 2px;
`;

const ItemTitleBlock = styled.h3`
  width: 100%;
  text-align: left;
  padding: 0;
  margin: 20px 0 10px 0;
`;

const ButtonBlock = styled.div`
  flex-shrink: 10;
  align-self: flex-end;
`;

const LabelBlock = styled.div`
  width: 100%;
  text-align: left;
  word-wrap: break-word;
`;

const ActiveItemsList = ({ groupedItems, markAsCompleted }) => {
  const dates = Object.keys(groupedItems).sort();
  return (
    <Fragment>
      {dates.map((date) => (
        <Fragment key={date}>
          <ItemTitleBlock>{dayjs(date).format("DD-MM-YYYY")}</ItemTitleBlock>
          {groupedItems[date].map((item, i) => (
            <ItemBlock key={i}>
              <LabelBlock>{item.label}</LabelBlock>
              <ButtonBlock>
                <Button type="success" onClick={() => markAsCompleted(item.id)}>
                  ✔
                </Button>
              </ButtonBlock>
            </ItemBlock>
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

const CompletedItemBlock = styled.div`
  width: 100%;
  text-align: left;
  word-wrap: break-word;
  text-decoration: line-through;
`;

const CompletedItemsList = ({ items, deleteTodo }) => {
  return (
    <Fragment>
      <ItemTitleBlock>Completed</ItemTitleBlock>
      {items.map((item, i) => (
        <ItemBlock key={i}>
          <CompletedItemBlock>{item.label}</CompletedItemBlock>
          <ButtonBlock>
            <Button type="danger" onClick={() => deleteTodo(item.id)}>
              ✗
            </Button>
          </ButtonBlock>
        </ItemBlock>
      ))}
    </Fragment>
  );
};

export default List;
