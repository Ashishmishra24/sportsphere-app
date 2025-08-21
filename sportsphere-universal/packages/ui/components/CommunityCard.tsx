import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styled } from '@tamagui/core'

const CommunityContainer = styled(View, {
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 16,
  marginVertical: 8,
  marginHorizontal: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
})

const CommunityHeader = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
})

const CommunityIcon = styled(View, {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '$blue10',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
})

const CommunityInfo = styled(View, {
  flex: 1,
})

const CommunityName = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '$gray12',
  marginBottom: 4,
})

const CommunityStats = styled(Text, {
  fontSize: 14,
  color: '$gray10',
})

const ActivityIndicator = styled(View, {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: '$green10',
  marginLeft: 8,
})

const CommunityContent = styled(View, {
  marginBottom: 12,
})

const RecentActivity = styled(Text, {
  fontSize: 14,
  color: '$gray11',
  marginBottom: 8,
})

const ActivityItem = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
})

const ActivityDot = styled(View, {
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: '$blue10',
  marginRight: 8,
})

const ActivityText = styled(Text, {
  fontSize: 12,
  color: '$gray10',
  flex: 1,
})

const ActionContainer = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '$gray5',
})

const JoinButton = styled(TouchableOpacity, {
  backgroundColor: '$blue10',
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 20,
})

const JoinText = styled(Text, {
  color: 'white',
  fontSize: 14,
  fontWeight: '600',
})

const MemberCount = styled(Text, {
  fontSize: 12,
  color: '$gray10',
})

interface CommunityActivity {
  id: string
  type: 'post' | 'match' | 'event'
  text: string
  time: string
}

interface CommunityCardProps {
  id: string
  name: string
  icon: string
  memberCount: number
  isActive: boolean
  recentActivities: CommunityActivity[]
  isJoined: boolean
  onJoin: () => void
  onPress: () => void
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  icon,
  memberCount,
  isActive,
  recentActivities,
  isJoined,
  onJoin,
  onPress,
}) => {
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <CommunityContainer>
        <CommunityHeader>
          <CommunityIcon>
            <Text style={{ fontSize: 20, color: 'white' }}>{icon}</Text>
          </CommunityIcon>
          <CommunityInfo>
            <CommunityName>{name}</CommunityName>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CommunityStats>{formatMemberCount(memberCount)} members</CommunityStats>
              {isActive && <ActivityIndicator />}
            </View>
          </CommunityInfo>
        </CommunityHeader>

        <CommunityContent>
          <RecentActivity>Recent Activity</RecentActivity>
          {recentActivities.slice(0, 3).map((activity) => (
            <ActivityItem key={activity.id}>
              <ActivityDot />
              <ActivityText>{activity.text}</ActivityText>
            </ActivityItem>
          ))}
        </CommunityContent>

        <ActionContainer>
          <MemberCount>{formatMemberCount(memberCount)} members</MemberCount>
          <JoinButton onPress={onJoin}>
            <JoinText>{isJoined ? 'Joined' : 'Join'}</JoinText>
          </JoinButton>
        </ActionContainer>
      </CommunityContainer>
    </TouchableOpacity>
  )
}
