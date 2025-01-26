import { useState, useCallback, useMemo } from "react";
import {
  isErrorUser,
  isPerformanceGlitchUser,
  isProblemUser,
  isVisualUser,
} from "utils/Credentials";
import InventoryListItem from "components/features/inventory/InventoryListItem";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import { sortAsc, sortDesc, sortHiLo, sortLoHi } from "utils/Sorting";
import Select from "components/common/Select";
import "./Inventory.css";
import { BacktraceClient } from "@backtrace-labs/react";

interface SortableItem {
  [key: string]: string | number;
}

interface InventoryItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image_url: string;
}

type SortableInventoryItem = InventoryItem & SortableItem;

interface InventoryProps {
  data: InventoryItem[];
}

interface SortEvent {
  target: {
    value: string;
  };
}

const Inventory = ({ data }: InventoryProps) => {
  const [inventoryList, setInventoryList] = useState<SortableInventoryItem[]>(() => sortAsc(data as SortableInventoryItem[], "name"));
  const [activeOption, setActiveOption] = useState("az");

  const sortByOption = useCallback((event: SortEvent) => {
    if (isProblemUser()) return;
    
    if (isErrorUser()) {
      BacktraceClient.instance?.send("Sorting is broken!", {
        sortOption: event.target.value,
        data,
      });
      return alert("Sorting is broken! This error has been reported to Backtrace.");
    }

    const newOption = event.target.value;
    setActiveOption(newOption);
    const sortableData = data as SortableInventoryItem[];

    switch (newOption) {
      case "az": setInventoryList(sortAsc(sortableData, "name")); break;
      case "za": setInventoryList(sortDesc(sortableData, "name")); break;
      case "hilo": setInventoryList(sortHiLo(sortableData, "price")); break;
      case "lohi": setInventoryList(sortLoHi(sortableData, "price")); break;
    }
  }, [data]);

  const sortOptions = useMemo(() => [
    { key: "az", value: "Name (A to Z)" },
    { key: "za", value: "Name (Z to A)" },
    { key: "lohi", value: "Price (low to high)" },
    { key: "hilo", value: "Price (high to low)" },
  ], []);

  const sortSelect = useMemo(() => (
    <Select
      activeOption={activeOption}
      options={sortOptions}
      onChange={sortByOption}
      testId="product-sort-container"
    />
  ), [activeOption, sortOptions, sortByOption]);

  if (isPerformanceGlitchUser()) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + 5000);
  }

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer
          secondaryTitle="Products"
          secondaryRightComponent={sortSelect}
        />
        <div id="inventory_container">
          <div>
            <div
              id="inventory_container"
              className="inventory_container"
              data-test="inventory-container"
            >
              <div className="inventory_list" data-test="inventory-list">
                {inventoryList.map((item, i) => (
                  <InventoryListItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                    image_url={isProblemUser() || (isVisualUser() && i === 0) ? "sl-404.jpg" : item.image_url}
                    isTextAlignRight={isVisualUser() && i > 1 && i < 4}
                    missAlignButton={isVisualUser() && i === 5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default Inventory;