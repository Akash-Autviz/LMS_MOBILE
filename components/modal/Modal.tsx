import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { memo } from "react";
import {
  Alert,
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

  const { SetAnsResultIdx, ansResultIdx, setIndex } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log(ansResultIdx);
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
              Quant
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
            {ansResultIdx.map((e: any, id: number) => {
              if (e.color) {
                return (
                  <QuestionNoContainer
                    setModalVisible={setModalVisible}
                    key={id}
                    quesno={id + 1}
                    color={e?.color}
                  />
                );
              } else {
                return (
                  <QuestionNoContainer
                    setModalVisible={setModalVisible}
                    key={id}
                    quesno={id + 1}
                  />
                );
              }
            })}
            {/* {Array.from(Array(length), (e: any, l: any) => {
              return (
                <QuestionNoContainer
                  key={l}
                  quesno={l + 1}
                  // backgroundColor={e.backgroundColor}
                />
              );
            })} */}

            <FinishButtonTest key={Math.random() * 100} />
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