import React from "react";
import PlaygroundApp from "../../../src/App";
import data from '../../../src/data.json';
import { parseKey } from "../../../src/utils";

const dataKeys = Object.keys(data) ?? [];

const RoutePage = ({ parsedData }: { parsedData: any }) => {
  return (
    <PlaygroundApp pageData={parsedData} />
  );
}

function parseQuery(type: string, key: string): object | null {
  const parsedType = parseKey(type);
  const parsedKey = key.toString();
  if (!parsedType || !parsedKey) {
    return null;
  }
  if (dataKeys.includes(parsedType)) {
    const sidebarItem = data[parsedType];
    const indexOfKey = sidebarItem.findIndex((i) => i.key.toLowerCase() == parsedKey.toLowerCase());
    if (indexOfKey !== -1) {
      return { ...sidebarItem[indexOfKey], globalKey: parsedType, index: 0 };
    }
  }
  return null;
}

export const getServerSideProps = async (context: any) => {
  const { type, key } = context.query

  const parsedData = parseQuery(type, key)

  return {
    props: {
      parsedData: parsedData
    }
  }
}

export default RoutePage