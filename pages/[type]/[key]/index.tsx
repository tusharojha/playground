import React from "react";
import PlaygroundApp from "../../../src/App";

const data = require('../../../src/data.json');
const dataKeys = Object.keys(data) ?? [];

const RoutePage = ({ parsedData }: { parsedData: any }) => {
  return (
    <PlaygroundApp pageData={parsedData} />
  );
}

function parseKey(value: string): string | undefined {
  const splitItems = value.split('-')
  let str = ''
  splitItems.forEach((splitItem) => {
    str = `${str}${splitItem.charAt(0).toUpperCase()}${splitItem.slice(1)} `;
  })

  if (str.charAt(str.length - 1) === ' ')
    return str.slice(0, str.length - 1);
  return str;
}

function parseQuery(type: string, key: string): object | null {
  const parsedType = parseKey(type);
  const parsedKey = key.toString();
  if (parsedType == undefined || parsedKey == undefined) {
    return null;
  }
  if (dataKeys.includes(parsedType)) {
    const indexOfKey = data[parsedType].findIndex((i) => i.key.toLowerCase() == parsedKey);
    if (indexOfKey !== -1) {
      return { ...data[parsedType][indexOfKey], globalKey: parsedType, index: 0 };
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