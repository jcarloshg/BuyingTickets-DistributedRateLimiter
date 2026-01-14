src/
├──application/
│         └── auth/
│               ├── sign-up/
│               │    ├── application/
│               │    │    └── sign-up       <- file where is implemented the use case
│               │    ├── models/
│               │    │    ├── db/           <- class with methods to write on db (all methods return an error "Method not implemented")
│               │    │    ├── entities/     <- entities to use in use case, use zod for schemas 
│               │    │    └── services/     <- class with methods for JWT or manage file for S3, etc (all methods return an error "Method not implemented")
│               │    └── infraestructure/
│               │         ├── db/           <- implements classes of models/db
│               │         └── services/     <- implements classes of models/services
│               └── login/
│                    ├── application/
│                    │    └── sign-up       <- file where is implemented the use case
│                    ├── models/
│                    │    ├── db/           <- class with methods to write on db (all methods return an error "Method not implemented")
│                    │    ├── entities/     <- entities to use in use case, use zod for schemas 
│                    │    └── services/     <- class with methods for JWT or manage file for S3, etc (all methods return an error "Method not implemented")
│                    └── infraestructure/
│                         ├── db/           <- implements classes of models/db
│                         └── services/     <- implements classes of models/services
└──presentation                             <- spece where is implemented the framework/libreary
          ├── controllers/                  <- controller provided by the framework/libreary
          ├── middlewares/                  <- middlewares provided by the framework/libreary
          └── routes/                       <- routes provided by the framework/libreary