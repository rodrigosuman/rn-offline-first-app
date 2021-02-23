import React from 'react'

import { IconProps } from 'react-native-vector-icons/Icon'

import MaterialVectorIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MainIcon: React.FC<IconProps> = (props: IconProps) => {
  return <MaterialVectorIcons {...props} />
}

export default MainIcon
