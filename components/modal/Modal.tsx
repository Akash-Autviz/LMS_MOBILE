import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { memo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useStateContext } from "../../screens/Context/ContextProvider";
import FinishButtonTest from "../FinishTestButton";
import QuestionNoContainer from "../QuestionNoContainer";
const wid = Dimensions.get("screen").width;
const high = Dimensions.get("screen").height;
const ResultModal = (props: any) => {
  const { ansResultIdx, setIndex, index } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const setCurrentIndex = (index: number) => {
    setIndex(index);
  };
  const { SumbitTest } = props;

  useEffect(() => {
    setCurrentIndex;
  }, [ansResultIdx]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: "#FFFFFF",
            height: "105%",
            top: high / 21.35,
            width: "85%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#319EAE",
              height: "10%",
              paddingHorizontal: "10%",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 26,
                color: "white",
              }}
            >
              {props.currentSection}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: "white",
              }}
            >
              <MaterialCommunityIcons name="close" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: wid / 1.2,
              alignItems: "center",
              height: high / 0.433,
              marginBottom: 200,
              paddingHorizontal: 15,
            }}
            style={{
              display: "flex",
              backgroundColor: "white",
              marginBottom: high / 4.5,
            }}
          >
            {props?.quesIndexArray.map((e: any, id: any) => {
              console.log(props.quesIndexArray);
              return index == id ? (
                <QuestionNoContainer
                  setModalVisible={setModalVisible}
                  key={id}
                  quesno={id + 1}
                  color={"#319EAE"}
                  setquesIndexArray={props.setquesIndexArray}
                  quesIndexArray={props.quesIndexArray}
                />
              ) : (
                // #FDD835
                <QuestionNoContainer
                  setModalVisible={setModalVisible}
                  key={id}
                  quesno={id + 1}
                  color={
                    e.userAnswer
                      ? "#63a461"
                      : e.skip == true
                      ? "#d94646"
                      : e.isMarkUp == true
                      ? "#8c20d5"
                      : null
                  }
                  setquesIndexArray={props.setquesIndexArray}
                  quesIndexArray={props.quesIndexArray}
                />
              );
            })}

            <FinishButtonTest
              SumbitTest={SumbitTest}
              setCurrentSectionId={props.setCurrentSectionId}
              key={Math.random() * 100}
            />
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        style={{
          width: 47,
          height: 47,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 11,
        }}
        onPress={() => setModalVisible(true)}
      >
        <SimpleLineIcons name="equalizer" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default memo(ResultModal);
