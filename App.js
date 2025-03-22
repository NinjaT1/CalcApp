import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Appearance } from "react-native";
import { evaluate } from "mathjs";

const colorScheme = Appearance.getColorScheme();

const getStyles = () => {
  if (colorScheme === "dark") {
    return darkStyles;
  } else {
    return lightStyles;
  }
};

const ColorStyles = getStyles();

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  let RESULT = "";
  const MAX_DIGITS = 30;

  const handleButtonClick = (value) => {
    setInput((prev) => {
      if (prev.length >= MAX_DIGITS) {
        return prev; // Max digits
      }

      const lastChar = prev.slice(-1);
      const isSymbol = /[/*+-]/.test(lastChar);
      const isNewValueSymbol = /[/*+-]/.test(value);

      if (isSymbol && isNewValueSymbol) {
        return prev;
      }

      if (value === ".") {
        const lastNumber = prev.split(/[/*+-]/).pop();
        if (lastNumber.includes(".")) {
          return prev;
        }
      }

      return prev + value;
    });
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const signed = async () => {
    try {
      const evalResult = (await evaluate(input)) * -1;
      RESULT = "";
      RESULT += evalResult;
      setInput(RESULT);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const percentSign = async () => {
    try {
      const evalResult = (await evaluate(input)) / 100;
      RESULT = "";
      RESULT += evalResult;
      setInput(RESULT);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleEvaluate = () => {
    try {
      const evalResult = evaluate(input);
      RESULT += evalResult;
      setInput(RESULT.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const calculateFontSize = () => {
    if (input.length >= 20 || result.length >= 20) {
      return 25; // Small font size for longer inputs
    } else if (input.length >= 15 || result.length >= 15) {
      return 30; // Small font size for longer inputs
    } else if (input.length >= 11 || result.length >= 15) {
      return 40; // Medium font size for medium-length inputs
    } else if (input.length >= 6 || result.length >= 6) {
      return 50; // Medium font size for medium-length inputs
    } else {
      return 60; // Large font size for shorter inputs
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.display, { fontSize: calculateFontSize() }]}
        value={input || result}
        editable={false}
      />
      <View style={styles.calculator}>
        <View style={styles.keys}>
          <TouchableOpacity
            style={styles.buttonACandCandPercent}
            onPress={handleClear}
          >
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonACandCandPercent}
            onPress={handleBackspace}
          >
            <Text style={styles.buttonText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonACandCandPercent}
            onPress={percentSign}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDivMul}
            onPress={() => handleButtonClick("/")}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDivMul}
            onPress={() => handleButtonClick("*")}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAddandSub}
            onPress={() => handleButtonClick("-")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonAddandSub}
            onPress={() => handleButtonClick("+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signed}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDecimal}
            onPress={() => handleButtonClick(".")}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonEquals}
            onPress={handleEvaluate}
          >
            <Text style={[styles.buttonText, { fontSize: 48 }]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110%",
    backgroundColor: "hsl(0, 0%, 0%)",
    overflow: "hidden",
  },
  calculator: {
    backgroundColor: "hsl(0, 0%, 0%)",
    height: 600,
    width: 400,
    overflow: "hidden",
  },
  display: {
    width: "100%",
    height: "40%",
    paddingTop: 120,
    paddingRight: 11,
    paddingLeft: 11,
    fontSize: 64,
    textAlign: "right",
    backgroundColor: "hsl(0, 0%, 100%)",
    color: "black", // text color
  },
  keys: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(0, 0%, 50%)",
    marginVertical: 1,
    marginHorizontal: 1,
  },
  buttonDivMul: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(35, 100%, 40%)",
    marginVertical: 1,
    marginHorizontal: 1,
  },
  buttonACandCandPercent: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(0, 0%, 60%)",
    marginVertical: 1,
    marginHorizontal: 1,
  },
  buttonEquals: {
    width: 96,
    height: 96,
    backgroundColor: "hsl(35, 100%, 40%)",
    marginVertical: 1,
    marginHorizontal: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDecimal: {
    width: 96,
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(0, 0%, 50%)",
    marginVertical: 1,
    marginHorizontal: 1,
  },

  buttonAddandSub: {
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsl(35, 100%, 40%)",
    marginVertical: 1,
    marginHorizontal: 1,
  },

  buttonText: {
    fontSize: 36,
    position: "absolute",
    alignItems: "center",
    fontWeight: "300",
    color: "whitesmoke",
  },
});

export default Calculator;
