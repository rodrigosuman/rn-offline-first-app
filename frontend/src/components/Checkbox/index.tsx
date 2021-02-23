import React, { useCallback, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { styles } from './styles'

import MainIcon from '../../resources/MainIcon'

interface IProps {
  checked: boolean
  onChange?: (value: boolean) => void
}

const Checkbox: React.FC<IProps> = (props: IProps) => {
  const onHandleChange = useCallback(() => {
    props.onChange && props.onChange(!props.checked)
  }, [props])

  return (
    <TouchableOpacity onPress={onHandleChange} activeOpacity={1}>
      <View
        style={[styles.container, props.checked ? styles.checkedStyle : {}]}
      >
        {props.checked ? (
          <MainIcon name="check-bold" size={25} color="#78ffcb" />
        ) : (
          <React.Fragment />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Checkbox
