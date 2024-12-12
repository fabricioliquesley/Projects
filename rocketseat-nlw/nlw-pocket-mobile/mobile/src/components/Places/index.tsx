import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Place as PlaceT } from "@/utils/types";
import { Place } from "@/components/Place";
import { styles } from "./styles";

type PlacesProps = {
  data: PlaceT[];
}

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 200
  }

  return (
    <BottomSheet 
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={true}
    >
      <BottomSheetFlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place data={item}/>
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}