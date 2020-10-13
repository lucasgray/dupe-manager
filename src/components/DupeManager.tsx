import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import produce from "immer";
import { useImmer } from "use-immer";

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

const defaultAccount = {
  name: "",
  company: Company.DOUBLED,
};

const defaultDupe = {
  resolveTo: defaultAccount,
  dupes: [],
};

const DupeManager: React.FC<DupeProps> = ({ dupes }) => {
  const [myDupes, setDupes] = useImmer(dupes);
  const [addingDupe, setAddingDupe] = useImmer<Dupe>(defaultDupe);
  const [savingLineItem, setSavingLineItem] = useImmer<Account>(defaultAccount);
  const [savingLineItems, setSavingLineItems] = useImmer<Account[]>([]);
  const [showAddNewSection, setShowAddNewSection] = useState(false);

  return (
    <div>
      <h1>Dupe mgr</h1>
      {myDupes.map((d, i) => (
        <section key={i}>
          <h1>
            {d.resolveTo.name} | {d.resolveTo.company}
          </h1>
          <div>
            {d.dupes.map((c) => (
              <div>
                {c.name} | {c.company}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <Button
          onClick={() => {
            setAddingDupe((draft) => {
              draft = defaultDupe;
              return draft;
            });
            setShowAddNewSection(true);
          }}
        >
          Make new resolve rule
        </Button>
        {showAddNewSection && (
          <section>
            <h3>Add new resolve rule</h3>

            <h4>Resolve to</h4>
            <Input
              placeholder={"Account name"}
              onChange={({ target: { value } }) =>
                setAddingDupe((draft) => {
                  draft.resolveTo.name = value;
                })
              }
            />
            <Select
              defaultValue={Company.DOUBLED}
              onChange={(v) =>
                setAddingDupe((draft) => {
                  draft.resolveTo.company = v;
                })
              }
            >
              <Select.Option value={Company.SINGLED}>Single D</Select.Option>
              <Select.Option value={Company.DOUBLED}>Double D</Select.Option>
              <Select.Option value={Company.TRIPLED}>Triple D</Select.Option>
            </Select>

            <h4>These dupes</h4>
            {addingDupe.dupes.map((savingDupe) => (
              <section>
                {savingDupe.company} | {savingDupe.name}
              </section>
            ))}
            <Input
              placeholder={"Account name"}
              onChange={({ target: { value } }) =>
                setSavingLineItem((draft) => {
                  draft.name = value;
                })
              }
            />
            <Select
              defaultValue={Company.DOUBLED}
              onChange={(v) =>
                setSavingLineItem((draft) => {
                  draft.company = v;
                })
              }
            >
              <Select.Option value={Company.SINGLED}>Single D</Select.Option>
              <Select.Option value={Company.DOUBLED}>Double D</Select.Option>
              <Select.Option value={Company.TRIPLED}>Triple D</Select.Option>
            </Select>
            <Button
              onClick={() => {
                setSavingLineItems((draft) => {
                  draft.push(savingLineItem);
                });
                setSavingLineItem((_) => defaultAccount);
              }}
            >
              Add
            </Button>
            <div>
              {savingLineItems.map((li, i) => (
                <div key={i}>
                  {li.name} | {li.company}
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                setDupes((draft) => {
                  draft.push(addingDupe);
                });
                setSavingLineItem((_) => defaultAccount);
                setAddingDupe((_) => defaultDupe);
                setShowAddNewSection(false);
              }}
            >
              Finish
            </Button>
          </section>
        )}
      </section>
    </div>
  );
};

export default DupeManager;
