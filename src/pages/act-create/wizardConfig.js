export const wizardConfig = [
    {
        id: 'step',
        content: [
            {
                type: 'input',
                title: 'Лицевой счет',
                name: 'account_number',
                placeholder: 'Введите номер лицевого счета',
            }
        ],
        next: 'step'
    },
    {
        id: 'step',
        content: [
            {
                type: 'input',
                title: 'Контактаный номер',
                name: '',
                placeholder: 'Введите контактный номер',
            },
            {
                type: 'input',
                title: 'Потребитель',
                name: '',
                placeholder: 'Фамилия, имя, отчество',
            },
            {
                type: 'input',
                title: 'Адрес',
                name: '',
                placeholder: 'Введите адрес',
            },
        ],
        next: 'step'
    },
    {
        id: 'step',
        title: 'Добавление фото счетчика до работы',
        content: [
            {
                type: 'input',
                title: 'Заводской № прибора учета',
                name: '',
                placeholder: 'Введите номер',
            },
            {
                type: 'fileInput',
                name: '',
                placeholder: 'Добавить фото счетчика',
            },
            {
                type: 'fileInput',
                name: '',
                placeholder: 'Добавить фото счетчика',
            },
            {
                type: 'checkbox',
                name: '',
                placeholder: 'Нет доступа к счетчику',
            },
        ],
        next: () => {}
    },
    {
        id: 'step',
        title: 'Добавление фото счетчика после работы',
        content: [
            {
                type: 'fileInput',
                name: '',
                placeholder: 'Добавить фото счетчика',
            },
            {
                type: 'fileInput',
                name: '',
                placeholder: 'Добавить фото счетчика',
            },
        ],
    },
    {
        id: 'step',
        title: 'Акт о:',
        content: [
            {
                type: 'radio',
                name: '',
                options: [
                    {
                        title: 'О ВВЕДЕНИИ ОГРАНИЧЕНИЯ (ПРИОСТАНОВЛЕНИИ) КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ',
                        value: ''
                    },
                    {
                        title: 'О ВОЗОБНОВЛЕНИИ ПРЕДОСТАВЛЕНИЯ КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ',
                        value: ''
                    },
                    {
                        title: 'ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ ВВЕДЕННОГО ОГРАНИЧЕНИЯ РЕЖИМА ПОТРЕБЛЕНИЯ',
                        value: ''
                    },
                    {
                        title: 'О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ К ЭЛЕКТРИЧЕСКИМ СЕТЯМ',
                        value: ''
                    },
                ]
            },
        ],
    },

    {
        id: 'step',
        content: [
            {
                type: 'radio',
                title: 'Коммутационный (вводной) аппарат:',
                name: '',
                options: [
                    {
                        title: 'Имеется',
                        value: ''
                    },
                    {
                        title: 'Отсутствует',
                        value: ''
                    },
                ]
            },
        ],
    },
    {
        id: 'step',
        content: [
            {
                type: 'radio',
                title: 'Основание введения ограничения (приостановления) режима потребления:',
                name: '',
                options: [
                    {
                        title: 'Неполная оплата коммунальной услуги по электроснабжению',
                        value: ''
                    },
                    {
                        title: 'Иное',
                        value: ''
                    },
                ]
            },
        ],
    },
]