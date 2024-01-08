import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import tw from "twrnc";
import apptw from '../../utils/lib/tailwind';
import AppText from '../Display/AppText';



type DropdownFieldProps = {

    data: (string | { label: string; value: string })[];
    errorMessage?: string;
    title: string
    value?: any | undefined
    onChange?: (selectedValue: any) => void;
}

const DropdownField = (props: DropdownFieldProps) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const handleChange = (item: any) => {

        // const selected = item.value
        // console.log(item)
        setValue(item.value);
        setIsFocus(false);

        props.onChange && props.onChange(item.value); 
    }

    return (
        <View style={styles.container}>
            <AppText style={apptw`text-base`} fontFamily="poppins-semibd">
                {props.title}
            </AppText>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'gray'  }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}

                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : ' '}

                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => handleChange(item)}
              

            />

            <ErrorMessage>{props.errorMessage}</ErrorMessage>

        </View>
    );
};

export default DropdownField;





// error message
const ErrorMessage = (props: { children: React.ReactNode }) => (
    <AppText style={tw`text-xs text-red-700 mt-1`}>{props?.children}</AppText>
);







const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
        padding: 1,
    },
    dropdown: {
        height: 50,
        borderColor: '',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '',
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        
        fontSize: 16,
    },
    selectedTextStyle: {
      
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        
        height: 20,
    },
    inputSearchStyle: {
        
        height: 40,
        fontSize: 16,
    },
});