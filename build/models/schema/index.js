"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriberSchema = exports.PaymentInstanceSchema = exports.ModeratorSchema = exports.LoginSchema = exports.LivingRoomSchema = exports.EventSchema = exports.EditUserSchema = exports.DigesInstanceSchema = exports.CostEventSchema = void 0;
var _typebox = require("@sinclair/typebox");
const LoginSchema = _typebox.Type.Object({
  email: _typebox.Type.String({
    format: 'email',
    errorMessage: {
      type: 'Type string',
      format: 'email invalid'
    }
  }),
  password: _typebox.Type.String({
    errorMessage: {
      type: 'Type string'
    }
  })
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Format object invalid'
  }
});
exports.LoginSchema = LoginSchema;
const EditUserSchema = _typebox.Type.Object({
  email: _typebox.Type.String({
    format: 'email',
    errorMessage: {
      type: 'Type string',
      format: 'email invalid'
    }
  }),
  password: _typebox.Type.String({
    errorMessage: {
      type: 'Type string'
    }
  })
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Format object invalid'
  }
});
exports.EditUserSchema = EditUserSchema;
const ModeratorSchema = _typebox.Type.Object({
  name: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  lastname: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  dni: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  email: _typebox.Type.String({
    format: 'email',
    errorMessage: {
      type: 'Type string',
      format: 'email invalid'
    }
  }),
  password: _typebox.Type.String({
    errorMessage: {
      type: 'Type string'
    }
  })
});
exports.ModeratorSchema = ModeratorSchema;
const SubscriberSchema = _typebox.Type.Object({
  name: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  lastname: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  nation: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  dni: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  institution: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  category: _typebox.Type.Number({
    errorMessage: {
      type: 'number'
    }
  }),
  email: _typebox.Type.String({
    format: 'email',
    errorMessage: {
      type: 'Type string',
      format: 'email invalid'
    }
  }),
  password: _typebox.Type.String({
    errorMessage: {
      type: 'Type string'
    }
  })
});
exports.SubscriberSchema = SubscriberSchema;
const EventSchema = _typebox.Type.Object({
  name: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  description: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  }),
  date_beginning_inscription: _typebox.Type.Number({
    errorMessage: {
      type: 'type number'
    }
  }),
  end_date_inscription: _typebox.Type.Number({
    errorMessage: {
      type: 'type number'
    }
  }),
  date_beginning: _typebox.Type.Number({
    errorMessage: {
      type: 'type number'
    }
  }),
  end_date: _typebox.Type.Number({
    errorMessage: {
      type: 'type number'
    }
  })
});
exports.EventSchema = EventSchema;
const CostEventSchema = _typebox.Type.Object({
  cost: _typebox.Type.Number({
    errorMessage: {
      type: 'type number'
    }
  }),
  target: _typebox.Type.String({
    errorMessage: {
      type: 'string'
    }
  })
});
exports.CostEventSchema = CostEventSchema;
const LivingRoomSchema = _typebox.Type.Object({
  name: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  }),
  description: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  }),
  fk_manager: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  })
});
exports.LivingRoomSchema = LivingRoomSchema;
const DigesInstanceSchema = _typebox.Type.Object({
  abstract: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  })
});
exports.DigesInstanceSchema = DigesInstanceSchema;
const PaymentInstanceSchema = _typebox.Type.Object({
  fk_subscriber: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  }),
  transaction: _typebox.Type.String({
    errorMessage: {
      type: 'type string'
    }
  })
});
exports.PaymentInstanceSchema = PaymentInstanceSchema;