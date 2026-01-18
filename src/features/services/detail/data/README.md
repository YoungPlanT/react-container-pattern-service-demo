# 📊 Данные услуг | Service Data

## Данные для каждого компонента имеют следующий вид
### 1. HeaderSection
```json 
{
  "title": "heaer_section",
  "description": "A scheme for a header section consisting of two parts that form a single header and a subheader",
  "type": "object",
  "properties": {
    "title_emphasized_part": {
      "type": "string",
      "description": "The first (accented) part of the title. It sets the key category, context, or focus. Typically rendered with visual emphasis (e.g., bold, uppercase, or a distinct color).",
      "examples": ["КОРПОРАТИВНЫЕ", "...", "..."]
    },
    "title_base_part": {
      "type": "string",
      "description": "The second (neutral) part of the title. It specifies the subject, details, or action within the context set by the emphasized part. Typically rendered in the regular base style.",
      "examples": ["процедуры и разрешение конфликтов", "...", "..."]
    },
    "sub_title": {
      "type": "string",
      "description": "An optional explanatory paragraph that elaborates on the title, providing more context or summary. It is displayed as plain text below the main title.",
      "examples": ["Корпоративные отношения находятся на стыке ...", "...", "..."]
    }
  },
  "required": ["title_emphasized_part", "title_base_part", "sub_title"],
  "additionalProperties": false
}
```

#### Текущая реализация
В текущей JSON Schema для `HeaderSection` определены три **обязательных** поля:
```json
{
  "title_emphasized_part": "КОРПОРАТИВНЫЕ",
  "title_base_part": "процедуры и разрешение конфликтов", 
  "sub_title": "Корпоративные отношения находятся на стыке..."
}
```

#### Гибкий подохд (рекомендация)
В соответствии с паттерном **Smart and Dumb Components**, требования к данным могут меняться в зависимости от типа контейнера (Container), который использует компонент.

**Рекомендуемый минимальный интерфейс:**
```json
{
  "required": ["title_base_part"]
}
```


## Для копирования в файл-json ServiceDetailData.json

``` json
"service_name": {
    "service_content_schema": [
      "HeaderSection",
      "CardSection",
      "BulletedListSection",
      "NumberedListSection",
      "ButtonSection"
    ],
    "data_service_content": {
      "header_section": {
        "title_emphasized_part": "",
        "title_base_part": "",
        "sub_title": ""
      },
      "card_section": {
        "title": "",
        "cards_data": [
          ""
        ]
      },
      "bulleted_list_section": {
        "title": "",
        "bulleted_list_data": {
          "0": {
            "img_url": "",
            "data": ""
          },
          "1": {
            "img_url": "",
            "data": "" 
          }
        }
      },
      "numbered_list_section": {
        "title": "",
        "numbered_list_data": [
          "",
          ""
        ]
      },
      "button_section": {
        "text_on_button": ""
      }
    }
  }
```
Для управления порядком отображения разделов (например, header_section, card_section) на странице услуги используется поле **"service_content_schema"**.
Оно содержит массив строк, где каждая строка — это ключ одного из компонентов.

**Важное правило**: Ключ каждого компонента может быть добавлен в схему не более одного раза, чтобы избежать дублирования контента на странице.

### 1. HeaderSection
```json
"header_section": {
  "title_emphasized_part": "",
  "title_base_part": "",
  "sub_title": ""
}
```

### 2. CardSection
```json
"card_section": {
  "title": "т",
  "cards_data": [
    "",
    ""
  ]
}
```

### 3. BulletedListSection
```json
"bulleted_list_section": {
  "title": "",
  "bulleted_list_data": {
    "0": {
      "img_url": "",
      "data": ""
    },
    "1": {
      "img_url": "",
      "data": "" 
    }
  }
}
```

### 4. NumberedListSection
```json
"numbered_list_section": {
  "title": "",
  "numbered_list_data": [
    "",
    ""
  ]
}
```

### 5. ButtonSection
```json
"button_section": {
  "text_on_button": ""
}
```
