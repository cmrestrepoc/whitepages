import React, { useEffect, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView
} from "react-native";
import DataApi from "../api";

const api = new DataApi();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_LIST":
      return {
        ...state,
        loading: false,
        list: action.list
      };
    case "GET_NEXT_PAGE":
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.list]
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        showModal: true,
        selectedItem: action.selectedItem
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false
      };
    case "ERROR":
      return {
        ...state,
        showModal: false,
        loading: false,
        error: true
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    list: [],
    selectedItem: {},
    error: false,
    loading: true,
    showModal: false,
    selectedItemId: ""
  });
  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADING" });
      try {
        const firstChunk = await api.getList({});
        dispatch({ type: "GET_LIST", list: firstChunk });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    })();
  }, []);
  return (
    <View style={styles.app}>
      <Text style={styles.header}>Whitepages</Text>
      {state.error ? (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>
            There was an error, please try again later
          </Text>
        </View>
      ) : state.loading ? (
        <>
          <ActivityIndicator
            style={styles.loader}
            color="#20252c"
            size="large"
          />
        </>
      ) : (
        <ScrollView scrollEventThrottle={0}>
          <FlatList
            data={state.list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const selectedItem = await api.get(item.id);
                    dispatch({ type: "SET_SELECTED_ITEM", selectedItem });
                  } catch (error) {
                    dispatch({ type: "ERROR" });
                  }
                }}
                style={styles.listItem}
              >
                <Text>{`${item.first_name} ${item.last_name}`}</Text>
              </TouchableOpacity>
            )}
          />
          <Modal
            animationType="slide"
            transparent="true"
            visible={state.showModal}
            onRequestClose={() => {
              dispatch({ type: "HIDE_MODAL" });
            }}
          >
            <TouchableOpacity
              style={styles.centeredView}
              onPress={() => {
                dispatch({ type: "HIDE_MODAL" });
              }}
            >
              <View style={styles.modalView}>
                <Text>{`${state.selectedItem.first_name} ${state.selectedItem.last_name}`}</Text>
                <Text>{"\n"}</Text>
                <Text>{`${state.selectedItem.address1}`}</Text>
                <Text>{`${state.selectedItem.city}, ${state.selectedItem.state} ${state.selectedItem.zip_code}`}</Text>
                <Text>{"\n"}</Text>
                <Text>{`${state.selectedItem.email}`}</Text>
                <Text>{`${state.selectedItem.phone}`}</Text>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: "100%",
    width: "100%"
  },
  listItem: {
    padding: 10,
    borderWidth: 2,
    marginHorizontal: 30,
    marginVertical: 5
  },
  errorView: {
    marginHorizontal: 20
  },
  errorText: {
    color: "red"
  },
  header: {
    padding: 20,
    fontSize: "3rem",
    fontFamily: "sans-serif"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    magin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "flex-start",
    borderWidth: 2
  },
  loader: {
    marginTop: 20
  }
});

export default App;
