import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  isErrorUser,
  isPerformanceGlitchUser,
  isProblemUser,
  isVisualUser,
} from "../utils/Credentials";
import InventoryListItem from "../components/InventoryListItem";
import SwagLabsFooter from "../components/Footer";
import HeaderContainer from "../components/HeaderContainer";
import { sortAsc, sortDesc, sortHiLo, sortLoHi } from "../utils/Sorting";
import Select from "../components/Select";
import "./Inventory.css";
import { BacktraceClient } from "@backtrace-labs/react";

const Inventory = ({ data }) => {
  console.log('===== Inventory Render Start =====');
  console.log('Data length:', data?.length);
  console.log('First data item:', data?.[0]);

  // Initialize state with logging
  const [inventoryList, setInventoryList] = useState(() => {
    console.log('Initializing inventoryList with data:', data?.length);
    return sortAsc(data, "name");
  });
  
  const [activeOption, setActiveOption] = useState(() => {
    console.log('Initializing activeOption');
    return "az";
  });

  useEffect(() => {
    console.log('Inventory mounted');
    return () => {
      console.log('Inventory unmounting');
    };
  }, []);

  useEffect(() => {
    console.log('inventoryList updated:', inventoryList?.length);
  }, [inventoryList]);

  // Memoize the options array
  const sortOptions = useMemo(() => {
    console.log('Creating sortOptions');
    return [
      { key: "az", value: "Name (A to Z)" },
      { key: "za", value: "Name (Z to A)" },
      { key: "lohi", value: "Price (low to high)" },
      { key: "hilo", value: "Price (high to low)" },
    ];
  }, []);

  const sortByOption = useCallback((event) => {
    console.log('sortByOption called with:', event.target.value);
    
    if (isProblemUser()) {
      console.log('Problem user detected, returning');
      return;
    } else if (isErrorUser()) {
      console.log('Error user detected, sending error report');
      BacktraceClient.instance.send("Sorting is broken!", {
        sortOption: event.target.value,
        data,
      });
      return alert(
        "Sorting is broken! This error has been reported to Backtrace."
      );
    }

    const newOption = event.target.value;
    console.log('Setting new activeOption:', newOption);
    setActiveOption(newOption);

    console.log('Sorting inventory list by:', newOption);
    switch (newOption) {
      case "az":
        setInventoryList(sortAsc(data, "name"));
        break;
      case "za":
        setInventoryList(sortDesc(data, "name"));
        break;
      case "hilo":
        setInventoryList(sortHiLo(data, "price"));
        break;
      case "lohi":
        setInventoryList(sortLoHi(data, "price"));
        break;
      default:
        console.log('Unknown sort option:', newOption);
        break;
    }
  }, [data]);

  // Memoize the Select component
  console.log('About to create sortSelect');
  const sortSelect = useMemo(() => {
    console.log('Creating sortSelect component');
    return (
      <Select
        activeOption={activeOption}
        options={sortOptions}
        onChange={sortByOption}
        testId="product-sort-container"
      />
    );
  }, [activeOption, sortOptions, sortByOption]);
  console.log('sortSelect created');

  // Handle performance glitch
  if (isPerformanceGlitchUser()) {
    console.log('Performance glitch user detected');
    const start = new Date().getTime();
    while (new Date().getTime() < start + 5000) {
      // PageLoad increases
    }
  }

  console.log('About to render HeaderContainer');
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
                {inventoryList.map((item, i) => {
                  console.log('Rendering item:', item.id);
                  return (
                    <InventoryListItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                      image_url={
                        isProblemUser() || (isVisualUser() && i === 0)
                          ? "sl-404.jpg"
                          : item.image_url
                      }
                      isTextAlignRight={isVisualUser() && i > 1 && i < 4}
                      missAlignButton={isVisualUser() && i === 5}
                    />
                  );
                })}
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