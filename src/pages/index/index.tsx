import { View, Text } from "@tarojs/components";
import Taro, { useDidHide, useDidShow, useLoad, useUnload } from "@tarojs/taro";
import "./index.less";

const report = (query) => {
  const search = Object.keys(query)
    .map((key) => `${key}=${encodeURIComponent(query[key])}`)
    .join("&");

  console.log(
    "report",
    `https://www.jianjia.fun/api/manual-log?content=${JSON.stringify(query)}`
  );

  Taro.request({
    url: `https://www.jianjia.fun/api/manual-log?content=${JSON.stringify(
      query
    )}`, // This value for demonstration purposes only is not a real API URL.
    header: {
      "content-type": "application/json", // Default value
    },
    success: function (res) {
      console.log(res.data);
    },
  });
};

export default function Index() {
  useLoad(() => {
    const systemInfo = Taro.getSystemInfoSync();
    report({ systemInfo, event: "useLoad" });

    console.log("Page useLoad.");
  });

  useDidShow(() => {
    const systemInfo = Taro.getSystemInfoSync();
    report({ systemInfo, event: "useDidShow" });

    console.log("Page useDidShow.");
  });

  useDidHide(() => {
    const systemInfo = Taro.getSystemInfoSync();
    report({ systemInfo, event: "useDidHide" });

    console.log("Page useDidHide.");
  });

  useUnload(() => {
    const systemInfo = Taro.getSystemInfoSync();
    report({ systemInfo, event: "useDidHide" });

    console.log("Page useUnload.");
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}
