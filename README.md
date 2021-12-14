# 구현과정 상세 설명
## 1단계: 지도 데이터 읽어서 2차원 배열에 저장하고 화면에 출력하기
### 요구사항
아래와 같은 형태로 각 스테이지 정보를 출력한다.

- 플레이어 위치는 배열 [0][0]을 기준으로 처리한다
- 아래 출력 예시와 상관없이 기준에 맞춰서 얼마나 떨어진지 표시하면 된다
- 스테이지 구분값은 출력하지 않는다

### 코드 설명
#### Map.js
```inputDataToArray(data)``` : 입력된 데이터를 문자열에서 2차원 배열로 변환하여 반환  
```generateUserMap(array)``` : 배열을 key로 stage, value를 map 값을 갖는 객체로 반환    
```printUserMap(userMap)``` : 입력된 2차원 배열을 다시 문자열로 변환하여 반환  
```countMapStructure(userMap)``` : 2차원 배열에서 넓이, 높이, 구멍의 수, 공의 수, 플레이어 위치를 배열로 반환  
```printMapStructure(structure)``` : 배열을 요소별로 나누어 문자열로 반환  
```generateComputerMap(userMap)``` : 문자열 2차원 배열의 요소를 숫자로 변환 후 2차원 배열 반환  
```convertUserMapStringToNumber(element)``` :  입력받은 요소를 숫자로 반환  


### 입력
```
Stage 1
#####
#OoP#
#####
=====
Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########
```
### 출력
```
stage1

#####
#OoP#
#####


가로크기: 5
세로크기: 3
구멍의 수: 1
공의 수: 1
플레이어 위치: (1,3)

stage2

  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########


가로크기: 11
세로크기: 7
구멍의 수: 4
공의 수: 4
플레이어 위치: (3,5)
```

## 2단계: 플레이어 이동 구현하기
### 요구사항

- 처음 시작하면 스테이지 2의 지도를 출력한다.
- 간단한 프롬프트 (예: SOKOBAN> )를 표시해 준다.
- 하나 이상의 문자를 입력받은 경우 순서대로 처리해서 단계별 상태를 출력한다.
- 벽이나 공등 다른 물체에 부딪히면 해당 명령을 수행할 수 없습니다 라는 메시지를 출력하고 플레이어를 움직이지 않는다.

### 코드 설명
####  index.js   
```movePlayerAccordingToCommandsStepTwo(commands)``` : 명령어의 유효 여부를 판단 후 이동 결과를 출력  
```controlPlayAccordingToCommands(command)``` : 입력된 명령어에 따라 제어 결과 반환  

#### Play.js
```movePlayerStepTwo(map,prevCoordinate, nextCoordinate)``` : 지도와 현재 플레이어의 위치, 변경할 위치를 입력받은 후 지도에서 현재 플레이어의 위치를 변경할 위치와 바꾼 후 지도 반환  
```moveCoordinateStepTwo(command,coordinate)``` : 명령어와 현재 위치를 입력받아 계산된 좌표를 반환  
```isCorrectRangeStepTwo(map,coordinate)``` : 변경될 좌표 유효 여부를 판별하여 반환   
```isCorrectCommand(command)``` : 입력된 명령어 유효 여부를 판별하여 반환  
```isCorrectControlCommand(command)``` : 입력된 명령어의 제어 명령어 여부를 판단하여 반환  



### 입력

```
dsdaq
```
### 출력
```
Stage 2

  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########

 #######
###  O  ###
#    o    #
# Oo  PoO #
###  o  ###
 #   O  #
 ########

  #######
###  O  ###
#    o    #
# Oo   oO #
###  oP ###
 #   O  #
 ########

  #######
###  O  ###
#    o    #
# Oo   oO #
###  o P###
 #   O  #
 ########

  #######
###  O  ###
#    o    #
# Oo   oO #
###  oP ###
 #   O  #
 ########

Bye~
```

## 3단계: 소코반 게임 완성하기
### 요구사항

- 난이도를 고려하여 스테이지 1부터 5까지 플레이 가능한 map.txt 파일을 스스로 작성한다.
- 지도 파일 map.txt를 문자열로 읽어서 처리하도록 개선한다.
- 처음 시작시 Stage 1의 지도와 프롬프트가 표시된다.
- r 명령 입력시 스테이지를 초기화 한다.
- 모든 o를 O자리에 이동시키면 클리어 화면을 표시하고 다음 스테이지로 표시한다.
- 주어진 모든 스테이지를 클리어시 축하메시지를 출력하고 게임을 종료한다.

### 코드 설명
####  index.js   
```printNextStage(stage)``` : 현재 스테이지를 입력받아 다음 스테이지 출력  
```movePlayerAccordingToCommands(commands)``` : 명령어의 유효 여부를 판단 후 이동 결과를 출력   

#### Play.js
```updateMapAccordingToCoordinate(map,prevCoordinate,nextCoordinate,pushDirection)``` : 지도와 현재 플레이어의 위치, 변경할 위치, 공을 이동할 위치를 입력받은 후 지도에서 현재 플레이어의 위치와 공의 위치를 변경한 후 지도 반환  
```moveCoordinateAccordingToCommands(command,coordinate)``` : 명령어와 현재 위치를 입력받아 계산된 좌표를 반환  
```isCorrectRange(map,coordinate,pushDirection)``` : 변경될 좌표 유효 여부를 판별하여 반환  
```isAnswer(map)``` : 입력된 지도의 정답 여부 반환  
```printCorrectAnswerMessage()``` : 정답 메시지 출력  

### 풀이 과정

- 이동 로직 ( 이동 방향 : → )
```
- 구멍을 통과하고 있는 상태에서 빈공간으로 공을 밀어낼 때
  (P)
 [ O o " " ] → [ O P o ]


- 구멍을 통과하고 있는 상태에서 구멍으로 공을 밀어낼 때
  (P)
 [ O o O ] → [ O P 0 ]


- 구멍을 통과하고 있는 상태에서 빈공간으로 이동할 때
  (P)
 [ O " " ] → [ O P ]


- 구멍으로 이동할 때
                (P)
 [ P O ] → [ " " O ]


- 빈공간으로 이동할 때
 [ P " " ] → [ " " P ]


- 빈공간에서 공을 구멍으로 밀어넣을 때
 [ P o O ] → [ " " P 0 ]


- 빈공간에서 공을 빈공간으로 밀어넣을 때
 [ P o " " ] → [ " " P o ]


- 빈공간에서 구멍에 넣은 공을 빈공간으로 밀어넣고 플레이어가 구멍을 통과할 때
                    (P)
 [ P 0 " " ] → [ " " O o ]


```

### 입력

```
a
aaddddaawss
```
### 출력
```
Stage 1

#####
#OoP#
#####

#####
#0P #
#####

빠밤! Stage 1 클리어!
턴수: 1

Stage 2

  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########

  #######
###  O  ###
#    o    #
# OoP  oO #
###  o  ###
 #   O  #
 ########

  #######
###  O  ###
#    o    #
# 0P   oO #
###  o  ###
 #   O  #
 ########

(...)

빠밤! Stage 2 클리어!
턴수: 11

Stage 3

######
#P   #
#  oO#
# Oo #
######

```
