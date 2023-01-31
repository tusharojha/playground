import React from "react";
import PlaygroundApp from "../../../src/App";
import data from '../../../src/data.json';
import { parseKey } from '../../../src/utils'

const dataKeys = Object.keys(data) ?? [];

const RoutePage = ({ parsedData, iframe }: { parsedData: any, iframe: any }) => {
  return (
    <PlaygroundApp iframe={iframe} pageData={parsedData} />
  );
}

function parseQuery(type: string, key: string, variant: string): object | null {
  const parsedType = parseKey(type);
  const parsedKey = parseKey(key);
  const parsedVariant = parseKey(variant);
  if (!parsedType || !parsedKey) {
    return null;
  }
  if (dataKeys.includes(parsedType)) {
    const indexOfKey = data[parsedType].findIndex((i) => i.key.toLowerCase() == parsedKey.toLowerCase());
    if (indexOfKey !== -1) {
      const sidebarItem = data[parsedType][indexOfKey];
      const indexOfVariant = sidebarItem.variants.findIndex((i) => i == parsedVariant);
      if (indexOfVariant !== -1) {
        return { ...sidebarItem, globalKey: parsedType, index: indexOfVariant };
      }
    }
  }
  return null;
}

export const getServerSideProps = async (context: any) => {
  const { type, key, variant, iframe } = context.query

  const parsedData = parseQuery(type, key, variant)

  return {
    props: {
      parsedData: parsedData,
      iframe: iframe ?? false,
    }
  }
}

export default RoutePage