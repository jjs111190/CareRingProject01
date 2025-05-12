import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;

export const globalStyles = StyleSheet.create({
  // 공통 컨테이너 스타일
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: scale(16),
  },

  // 제목 스타일
  title: {
    fontSize: scale(32),
    fontWeight: 'bold',
    marginBottom: scale(8),
    color: '#000',
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: scale(24),
    fontSize: scale(16),
    textAlign: 'center',
  },

  // 프로필 이미지 스타일
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: scale(8),
  },

  // 입력 필드 스타일
  inputContainer: {
    width: '90%',
    marginBottom: scale(12),
  },
  label: {
    color: '#4B5563',
    marginBottom: scale(4),
    fontSize: scale(13),
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: scale(12),
    fontSize: scale(13),
    height: scale(44),  // 모든 input 필드 높이를 통일
  },
  unitText: {
    position: 'absolute',
    right: scale(16),
    top: scale(12),
    color: '#6B7280',
  },

  // 버튼 스타일
  button: {
    width: '90%',
    backgroundColor: '#678CC8',
    borderRadius: 8,
    padding: scale(14),
    marginBottom: scale(24),
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: scale(18),
  },

  // 소셜 로그인 스타일
  socialSignInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  socialSignInText: {
    marginHorizontal: scale(8),
    color: '#6B7280',
    fontSize: scale(14),
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(16),
    marginBottom: scale(24),
  },
  socialIcon: {
    width: scale(48),
    height: scale(48),
  },

  // 링크 및 푸터 텍스트 스타일
  footerText: {
    color: '#6B7280',
    fontSize: scale(14),
  },
  linkText: {
    color: '#3B82F6',
    fontSize: scale(14),
  },

  // 뒤로가기 버튼 스타일
  backButton: {
    position: 'absolute',
    top: scale(40),
    left: scale(20),
  },
  backIcon: {
    width: scale(30),
    height: scale(30),
  },

  // 비밀번호 관련 스타일
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: scale(4),
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: scale(14),
  },

  // 행 스타일 (행 배치)
  rowContainer: {
    flexDirection: 'row',
    width: '90%',
  },

  // 선택기 스타일 (Picker)
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: scale(44),  // 높이 통일
    justifyContent: 'center',
    fontSize: 10,
  },
  picker: {
    height: scale(44),
    fontSize: 10,
  },
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#678CC8',
},
logoRow: {
  flexDirection: 'row',       // 로고와 텍스트를 한 줄로 배치
  alignItems: 'center',       // 세로 중앙 정렬
},
loadingLogo: {
  width: 80,                  // 로고 크기 조정
  height: 80,                 // 로고 크기 조정
},
loadingText: {
  fontSize: 50,    
  fontWeight: 'bold',           // 텍스트 크기
  color: '#FFFFFF',
  marginLeft: 8,              // 로고와 텍스트 간격 최소화
},
loadingSpinner: {
  marginTop: 20,
},
});