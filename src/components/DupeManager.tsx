import React, { useState } from "react";
import { Button, Input, Select } from "antd";

enum Company {
  DOUBLED,
  SINGLED,
  TRIPLED,
}

type Account = {
  name: string;
  company: Company;
};

type Dupe = {
  resolveTo: Account;
  dupes: Account[];
};

export const dupes: Dupe[] = [
  {
    resolveTo: {
      name: "Acme Inc",
      company: Company.DOUBLED,
    },
    dupes: [
      {
        name: "Acme Global",
        company: Company.SINGLED,
      },
      {
        name: "Acme LLC",
        company: Company.TRIPLED,
      },
    ],
  },
  {
    resolveTo: {
      name: "CCL Worldwide",
      company: Company.TRIPLED,
    },
    dupes: [
      {
        name: "Heroes Hearth Tourney",
        company: Company.DOUBLED,
      },
    ],
  },
];

type DupeProps = {
  dupes: Dupe[];
};

const DupeManager: React.FC<DupeProps> = ({ dupes }) => {
  const [myDupes, setDupes] = useState(dupes);
  const [addingDupe, setAddingDupe] = useState<Dupe>();
  const [savingLineItem, setSavingLineItem] = useState<Account>();
  return (
    <div>
      <h1>Dupe mgr</h1>
      {myDupes.map((d) => (
        <section>
          <h1>
            {d.resolveTo.name} | {d.resolveTo.company}
          </h1>
          <p>
            {d.dupes.map((c) => (
              <p>
                {c.name} | {c.company}
              </p>
            ))}
          </p>
        </section>
      ))}

      <section>
        <Button
          onClick={() =>
            setAddingDupe({
              resolveTo: { name: "", company: Company.DOUBLED },
              dupes: [],
            })
          }
        >
          Make new resolve rule
        </Button>
        {addingDupe && (
          <section>
            <h3>Add new resolve rule</h3>

            <h4>Resolve to</h4>
            <Input placeholder={"Account name"} />
            <Select defaultValue={Company.DOUBLED}>
              <Select.Option value={Company.SINGLED}>Single D</Select.Option>
              <Select.Option value={Company.DOUBLED}>Double D</Select.Option>
              <Select.Option value={Company.TRIPLED}>Triple D</Select.Option>
            </Select>

            <h4>These dupes</h4>
            {addingDupe.dupes.map((savingDupe) => (
              <p>
                {savingDupe.company} | {savingDupe.name}
              </p>
            ))}
            <Input
              placeholder={"Account name"}
              onChange={({ target: { value } }) =>
                setSavingLineItem({
                  company: savingLineItem
                    ? savingLineItem.company
                    : Company.DOUBLED,
                  name: value,
                })
              }
            />
            <Select
              defaultValue={Company.DOUBLED}
              onChange={(v) =>
                setSavingLineItem({
                  company: v,
                  name: savingLineItem ? savingLineItem.name : "",
                })
              }
            >
              <Select.Option value={Company.SINGLED}>Single D</Select.Option>
              <Select.Option value={Company.DOUBLED}>Double D</Select.Option>
              <Select.Option value={Company.TRIPLED}>Triple D</Select.Option>
            </Select>
            <Button
              onClick={() => {
                const newDupes = dupes.slice();
                addingDupe && newDupes.push(addingDupe);
                setDupes(newDupes);
              }}
            >
              Add
            </Button>
          </section>
        )}
      </section>
    </div>
  );
};

export default DupeManager;
